import _ from 'lodash';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import request from 'request';
import randomstring from 'randomstring';
import sharp from 'sharp';
import numeral from 'numeral';
import AWS from 'aws-sdk';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import PricingModel from '../lib/PricingModel';
import QueueModel from '../lib/queueModel';
import PhotosModel from '../lib/PhotosModel';
import GenericModel from '../lib/GenericModel';
import pdfMakeEstimate from '../methods/pdfMake';
import { sendPushtoEstimators } from '../methods/oneSignal';
import { sendSMStoSurveyor, sendSMStoCustomer } from '../methods/twilio';
import { sendEmailSurveytoCustomer, sendEmailEstimatetoCustomer } from '../methods/sendInBlue';
import { setMapsLocation } from '../methods/googleMaps';
import { addCustomertoQueue, removeCustomerfromQueue } from '../methods/queue';
import saveDescription from '../methods/saveDescription';


sharp.concurrency(1);
dotenv.config();

// console.log(base64Img)
// 0: New Customer, Inquiry no survery
// 1: New Customer, Online Survey sent
// 2: Customer, Online Survey Received
// 3: Customer, Sent to Surveyor
// 4: Surveyor made contact, followup required
// 5: Onsite visit Scheduled
// 6: Onsite Survey Complete

class GetQueue {
  constructor() {
    this.getQueue = () => {
      const queue = QueueModel.find((error, data) => data);
      return queue;
    };
  }
}

class Customers {
  constructor() {
    this.findCustomers = () => {
      const customers = CustomersModel.find((error, data) => data);
      return customers;
    };
  }
}

class Customer {
  constructor() {
    this.findCustomer = ({ id }) => {
      if (id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          const customer = CustomersModel.findOne({ _id: id }, (error, data) => data);
          return customer;
        }
      }
    };
  }
}

class GetCustomer {
  constructor() {
    this.getCustomer = ({ id }) => {
      if (id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          const customer = CustomersModel.findOne({ _id: id }, (error, data) => data);
          return customer;
        }
      }
    };
  }
}

class Users {
  constructor() {
    this.findUsers = () => {
      const users = UsersModel.find((error, data) => data);
      return users;
    };
  }
}

class User {
  constructor() {
    this.findUser = ({ id }) => {
      if (id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          const user = UsersModel.findOne({ _id: id }, (error, data) => data);
          return user;
        }
      }
    };
  }
}

class Surveyors {
  constructor() {
    this.findSurveyors = () => {
      const surveyors = UsersModel.find({ surveyor: true }, (error, users) => users);
      return surveyors;
    };
  }
}

class Address {
  constructor() {
    this.findAddress = ({ searchTerm }) => {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=geocode&components=country:ca&language=en&key=AIzaSyCRy96pXXmdiU4coVd23pxdBWeLmC8oIn0`;
      const address = axios.get(url).then(data => data.data.predictions.map(prediction => ({ description: prediction.description }))).catch((error) => {
        console.log(error);
      });
      return address;
    };
  }
}

class NewCustomer {
  constructor() {
    this.submitCustomer = ({
      firstName,
      lastName,
      email1,
      email2,
      hphone,
      cphone,
      wphone,
      address,
      notes,
      surveyor,
      estimator,
      status }) => {
      const newCustomer = new CustomersModel({
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status,
      });
      newCustomer.save();
      return newCustomer;
    };
  }
}
class UpdateCustomer {
  constructor() {
    this.updateCustomer = ({
      id,
      firstName,
      lastName,
      email1,
      email2,
      hphone,
      cphone,
      wphone,
      address,
      notes,
      surveyor,
      estimator,
      status }) => {
      const payload = {
        id,
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status,
      };

      const changedData = {};
      _.each(payload, (value, key) => {
        if (value !== undefined) {
          changedData[key] = value;
        }
      });
      const Customer = CustomersModel.findOneAndUpdate({ _id: id }, changedData)
        .then(customer => customer);
      return Customer;
    };
  }
}

class UpdateUser {
  constructor() {
    this.updateUser = (args) => {
     // console.log(args);
      const id = args.id;
      delete args.id;
      const User = UsersModel.findOneAndUpdate({ _id: id }, args)
      .then(user => user);
      return User;
    };
  }
}

class UpdateDispatchInfo {
  constructor() {
    this.updateDispatchInfo = (args) => {
      const Customer = CustomersModel.findOne({ _id: args.id })
               .then((customer) => {
                 customer.email1Notification = args.dispatch.email1;
                 customer.email2Notification = args.dispatch.email2;
                 customer.cellNotification = args.dispatch.cphone;
                 customer.homeNotification = args.dispatch.hphone;
                 customer.workNotification = args.dispatch.wphone;
                 customer.address = args.dispatch.address;
                 customer.sendSurvey = args.dispatch.survey;
                 customer.surveyor = args.dispatch.surveyor;
                 setMapsLocation(customer);
                 customer.save();
                 return customer;
               });
      return Customer;
    };
  }
}

class SubmitCustomer {
  constructor() {
    this.submitCustomer = (args) => {
      const Customer = CustomersModel.findOne({ _id: args.id })
             .then((data) => {
               const surveyor = !data.surveyor.id;
               const survey = !data.sendSurvey;
               const inquriy = survey && surveyor;
               // does customer want online estmate? send to prefered mode of contact
               if (data.sendSurvey === true) {
                 if (data.cellNotification) {
                   sendSMStoCustomer({ number: data.cphone, data });
                 }
                 if (data.homeNotification) {
                   sendSMStoCustomer({ number: data.hphone, data });
                 }
                 if (data.workNotification) {
                   sendSMStoCustomer({ number: data.wphone, data });
                 }
                 if (data.email1Notification) {
                   sendEmailSurveytoCustomer({ email: data.email1, data });
                 }
                 if (data.email2Notification) {
                   sendEmailSurveytoCustomer({ email: data.email2, data });
                 }
                 data.status = 1;
                 // addCustomertoQueue(data);  // this is now initiated via toggle survey via cutomer upload app
                 // sendPushtoEstimators(data);
                 data.save();
               }
               if (!surveyor) {
                 sendSMStoSurveyor(data);
                 UsersModel.findOne({ _id: data.surveyor.id })
                         .then((user) => {
                           user.newCustomers.push({
                             id: data._id,
                             firstName: data.firstName,
                             lastName: data.lastName,
                             email1: data.email1,
                             email2: data.email2,
                             cphone: data.cphone,
                             hphone: data.hphone,
                             wphone: data.wphone,
                             address: data.address,
                             status: 0,
                           });
                           user.save();
                         });
                 data.status = 3;
                 data.save();
               }
               if (inquriy) {
                 data.status = 0;
                 data.save();
               }
               // setMapsLocation(data);
               return data;
             });
      return Customer;
    };
  }
}
class SubmitFollowup {
  constructor() {
    this.submitFollowup = (args) => {
      console.log(args);
      const status = args.description === 'Followup' ? 1 : 2;
      UsersModel.findOne({ _id: args.userid }).then((user) => {
        user.newCustomers = user.newCustomers.map((customer) => {
          if (customer.id === args.custid) {
            customer.status = status;
            return customer;
          }
          return customer;
        });
        user.followUp.push(args);
        user.save();
      });
    };
  }
}
class GetAppointments {
  constructor() {
    this.getAppointments = (args) => {
      if (args.userid) {
        if (args.userid.match(/^[0-9a-fA-F]{24}$/)) {
          const selectedMonthDate = {
            date: new Date(args.date).getDate(),
            month: new Date(args.date).getMonth(),
          };
          return UsersModel.findOne({ _id: args.userid }).then(user => user.followUp.filter((apt) => {
            const followupMonthDate = {
              date: new Date(apt.start).getDate(),
              month: new Date(apt.start).getMonth(),
            };
            if (_.isEqual(followupMonthDate, selectedMonthDate)) {
              return apt;
            }
          }),
     );
        }
      }
    };
  }
}

class AddNotes {
  constructor() {
    this.addNotes = (args) => {
      const payload = {
        _id: randomstring.generate(7),
        text: args.note.text,
        user: args.note.user,
        createdAt: args.note.createdAt,
      };
      CustomersModel.findOne({ _id: args.note.custid })
        .then((customer) => {
          customer.notes.push(payload);
          customer.save();
          return customer;
        });
    };
  }
}

class DeleteNotes {
  constructor() {
    this.deleteNotes = args => CustomersModel.findOne({ _id: args.custid })
         .then((customer) => {
           customer.notes.splice(args.index, 1);
           customer.save();
           return true;
         });
  }
}
class DeleteAppointment {
  constructor() {
    this.deleteAppointment = (args) => {
      UsersModel.findOne({ _id: args.userid }).then((user) => {
        user.followUp = _.reject(user.followUp, (apt) => {
          if (args.meetingid == apt._id) {
            return apt;
          }
        });
        user.save();
        return user;
      });
    };
  }
}
class GetUser {
  constructor() {
    this.getUser = (args) => {
      if (args.id) {
        if (args.id.match(/^[0-9a-fA-F]{24}$/)) {
          const user = UsersModel.findOne({ _id: args.id }, (error, data) => data);
          return user;
        }
      }
    };
  }
 }
class AddSurveyNotes {
  constructor() {
    this.addSurveyNotes = (args) => {
      const payload = {
        heading: args.heading,
        description: args.description,
        text: args.text,
        timestamp: args.timestamp,
        user: args.user,
      };
      CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          customer.survey.notes.push(payload);
          customer.save();
        });
      if (!args.online) {
        UsersModel.findOne({ _id: args.userid })
           .then((user) => {
             user.newCustomers = user.newCustomers.map((customer) => {
               if (customer.id === args.custid) {
                 customer.status = 3;
                 return customer;
               }
               return customer;
             });
             user.save();
           });
      }
    };
  }
 }

class AddSurveyPhoto {
  constructor() {
    this.addSurveyPhoto = (args) => {
      const parseImgString = () => {
        const array = args.orginalBase64.split(',');
        if (array[0] === 'data:image/png;base64' || array[0] === 'data:image/jpeg;base64') {
          return array[1];
        }
        return args.orginalBase64;
      };

      const docID = randomstring.generate(12);
      return CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          const file = args.heading + randomstring.generate({
            length: 4,
            charset: 'numeric',
          });
          const originalUrl = `https://3lpm.s3.ca-central-1.amazonaws.com/${customer._id}/${file}.jpg`;
          const thumbUrl = `https://3lpm.s3.ca-central-1.amazonaws.com/${customer._id}/thumbnail${file}.jpg`;
          const payload = {
            heading: args.heading,
            description: args.description,
            orginalURL: originalUrl,
            thumbURL: thumbUrl,
            timestamp: args.timestamp,
            user: args.user,
            thumb: thumbUrl,
            photo: originalUrl,
            caption: args.heading,
            selected: false,
            filename: file,
            docID,
            localfile: args.localfile,
          };
          const buffer = Buffer.from(parseImgString(), 'base64');
          const s3 = new AWS.S3({ region: 'us-east-2' });
          sharp(buffer)
            .resize(100)
            .toFile(`images/${file}.jpg`)
              .then(() => {
                fs.readFile(`images/${file}.jpg`, {}, (err, res) => {
                  const params = {
                    Bucket: '3lpm',
                    Key: `${customer._id}/thumbnail${file}.jpg`,
                    Expires: 60,
                    ACL: 'public-read',
                    Body: res,
                  };
                  s3.upload(params, (err, res) => {
                    console.log(res);
                    console.log(err);
                  });
                });
              });

          const s3Params = {
            Bucket: '3lpm',
            Key: `${customer._id}/${file}.jpg`,
            Expires: 60,
            ACL: 'public-read',
            Body: buffer,
          };
          s3.upload(s3Params, (err, res) => {
            console.log(res);
            console.log(err);
          });

          customer.survey.photos.push(payload);
          customer.save();
          const photo = new PhotosModel({
            base64: `data:image/jpeg;base64,${parseImgString()}`,
            url: originalUrl,
            docID,
          });
          photo.save();
          return true;
        });
    };
  }
 }
class GetSurveyPhotos {
  constructor() {
    this.getSurveyPhotos = args => CustomersModel.findOne({ _id: args.id })
        .then(customer => (customer.survey.photos),
        );
  }
 }
class GetSurveyLocalPhotos {
  constructor() {
    this.getSurveyLocalPhotos = args => CustomersModel.findOne({ _id: args.id })
    .then(customer => customer.survey.photos.map(c => ({ photo: c.localfile, selected: false })),
  );
  }
 }

class GetMessages {
  constructor() {
    this.getMessages = (args) => {
      console.log(args);
      if (args.id.match(/^[0-9a-fA-F]{24}$/)) {
        const Messages = CustomersModel.findOne({ _id: args.id })
        .then((customer) => {
          if (customer.notes) {
            return customer.notes;
          }
        });
        return Messages;
      }
    };
  }
 }

class ToggleSurveyReady {
  constructor() {
    this.toggleSurveyReady = (args) => {
      console.log(args);
      CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          if (customer.status <= 3) {
            sendPushtoEstimators(customer);
            addCustomertoQueue(customer);
            customer.status = 4;
            customer.surveyReadyforPrice = true;
          } else {
            console.log('pingFalse', customer.status);

            removeCustomerfromQueue(customer);
            customer.status = 3;
            customer.surveyReadyforPrice = false;
          }
          customer.save();
        });
      if (!args.online) {
        UsersModel.findOne({ _id: args.userid })
         .then((user) => {
           user.newCustomers = user.newCustomers.map((customer) => {
             if (customer.id === args.custid) {
               if (customer.status === 3) {
                 customer.status = 4;
               } else if (customer.status === 4) {
                 customer.status = 3;
               }
             }
             return customer;
           });
           user.save();
         });
      }
    };
  }
 }

class SelectSurveyPhoto {
  constructor() {
    this.selectSurveyPhoto = (args) => {
      CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          customer.survey.photos = customer.survey.photos.map((photo, idx) => {
            if (idx == parseInt(args.index)) {
              photo.selected = !photo.selected;
              return photo;
            }
            return photo;
          });
          customer.save();
        });
    };
  }
 }

class GetFinishedSurvey {
  constructor() {
    this.getFinishedSurvey = (args) => {
      const output = [];
      return CustomersModel.findOne({ _id: args.id })
        .then((customer) => {
         // console.log(customer)
          const results = customer.survey.photos.concat(customer.survey.notes);
          const headings = _.uniq(results.map(heading => heading.heading));
          headings.forEach((heading) => {
            output.push({
              heading,
              photos: [],
              notes: [],
            });
          });
          customer.survey.photos.forEach((photo) => {
            const idx = headings.indexOf(photo.heading);
            output[idx].photos.push({
              url: photo.photo,
              thumb: photo.thumb,
              description: photo.description,
              timestamp: photo.timestamp,
              caption: photo.caption,
              user: photo.user,
              docID: photo.docID,
            });
          });
          customer.survey.notes.forEach((note) => {
            const idx = headings.indexOf(note.heading);
            output[idx].notes.push({
              text: note.text,
              description: note.description,
              timestamp: note.timestamp,
              caption: note.caption,
              user: note.user,
            });
          });
        }).then(() => output);
    };
  }
 }

class GetFinishedSurveyQuery {
  constructor() {
    this.getFinishedSurveyQuery = (args) => {
      const output = [];
      return CustomersModel.findOne({ _id: args.id })
        .then((customer) => {
         // console.log(customer)
          const results = customer.survey.photos.concat(customer.survey.notes);
          const headings = _.uniq(results.map(heading => heading.heading));
          headings.forEach((heading) => {
            output.push({
              heading,
              photos: [],
              notes: [],
            });
          });
          customer.survey.photos.forEach((photo) => {
            const idx = headings.indexOf(photo.heading);
            output[idx].photos.push({
              url: photo.photo,
              thumb: photo.thumb,
              description: photo.description,
              timestamp: photo.timestamp,
              caption: photo.caption,
              user: photo.user,
              docID: photo.docID,
            });
          });
          customer.survey.notes.forEach((note) => {
            const idx = headings.indexOf(note.heading);
            output[idx].notes.push({
              text: note.text,
              description: note.description,
              timestamp: note.timestamp,
              caption: note.caption,
              user: note.user,
            });
          });
        }).then(() => output);
    };
  }
 }

class AddPricing {   //NO LONGER IN USE!
  constructor() {
    this.addPricing = (args) => {
      CustomersModel.findOne({ _id: args.custid })
          .then((customer) => {
            if (!customer.pricing) {
              customer.pricing = [];
            }
            customer.pricing.push(args.price);
            customer.save();
          });
    };
  }
 }

class AddPrice {
  constructor() {
    this.addPrice = (args) => {
     if(args.price.description){
      saveDescription(args.price.description, args.price.amount);
      if(args.price.option1.description){
        saveDescription(args.price.option1.description, args.price.option1.amount);
      }
     if(args.price.option2.description){
        saveDescription(args.price.option2.description, args.price.option2.amount);
      }
     if(args.price.option3.description){
        saveDescription(args.price.option3.description, args.price.option3.amount);
      }
      if(args.price.option4.description){
        saveDescription(args.price.option4.description, args.price.option4.amount);
      }
      if(args.price.option5.description){
        saveDescription(args.price.option5.description, args.price.option5.amount);
      }

      CustomersModel.findOne({ _id: args.custid })
          .then((customer) => {
            if (!customer.prices) {
              customer.prices = [];
            }
            customer.prices.push(args.price);
            customer.save();
          });

     }
    };
  }
 }

class DeletePrice {
  constructor() {
    this.deletePrice = (args) => {
      CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          if (args.Option === 'option0') {
            if (!customer.prices[args.index].option1.description) {
              customer.prices.splice(args.index, 1);
            }
          }

          if (args.Option !== 'option0') {
            customer.prices[args.index][args.Option].description = null;
            customer.prices[args.index][args.Option].amount = null;
          }

          customer.save();
        });
      return true;
    };
  }
 }

class EditPriceDescription {
  constructor() {
    this.editPriceDescription = (args) => {
      CustomersModel.findById(args.custid)
      .then((customer) => {
        if (args.option === 'option0') {
          customer.prices[args.index].description = args.text;
        }
        if (args.option !== 'option0') {
          customer.prices[args.index][args.option].description = args.text;
        }
        customer.save();
      });
    };
  }
}

class EditPriceAmount {
  constructor() {
    this.editPriceAmount = (args) => {
      CustomersModel.findById(args.custid)
      .then((customer) => {
        if (args.option === 'option0') {
          customer.prices[args.index].amount = args.amount;
        }
        if (args.option !== 'option0') {
          customer.prices[args.index][args.option].description = args.amount;
        }
        customer.save();
      });
    };
  }
 }


class AcceptEstimate {
  constructor() {
    this.acceptEstimate = (args) => {
      removeCustomerfromQueue(args.custid);
      return CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          UsersModel.findOne({ _id: args.userid })
            .then((user) => {
             if(!_.includes(user.estimates, args.custid)){
               user.estimates.push({
                id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email1: customer.email1,
                email2: customer.email2,
                hphone: customer.hphone,
                cphone: customer.cphone,
                wphone: customer.wphone,
                address: customer.address,
                status: 0,
              });
              user.save();
             }
            });
          customer.estimator = args.userid;
          removeCustomerfromQueue(customer);
          customer.save();
          return customer;
        });
    };
  }
 }

class GetMyCustomers {
  constructor() {
    this.getMyCustomers = (args) => {
      const output = {
        newcustomers: [],
        followup: [],
        onsite: [],
        inprogress: [],
        surveycomplete: [],
        myestimates: [],
        estimatequeue: [],
      };
      if (args.id) {
        QueueModel.find()
          .then((q) => {
            q.forEach(customer => output.estimatequeue.push(customer));
          });

        if (args.id.match(/^[0-9a-fA-F]{24}$/)) {
          return UsersModel.findOne({ _id: args.id })
           .then((user) => {
             user.newCustomers.forEach((customer) => {
               if (customer.status === 0) {
                 output.newcustomers.push(customer);
               }
               if (customer.status === 1) {
                 output.followup.push(customer);
               }
               if (customer.status === 2) {
                 output.onsite.push(customer);
               }
               if (customer.status === 3) {
                 output.inprogress.push(customer);
               }
               if (customer.status === 4) {
                 output.surveycomplete.push(customer);
               }
             });
             user.estimates.forEach((customer) => {
               if (customer.status === 0) {
                 output.myestimates.push(customer);
               }
             });
           }).then(() => output);
        }
      }
    };
  }
 }

class GetPrices {
  constructor() {
    this.getPrices = () => {
      const prices = PricingModel.find((error, data) => data);
      return prices;
    };
  }
}
class GetEstimateResults {
  constructor() {
    this.getEstimateResults = args => CustomersModel.findOne({ _id: args.custid })
      .then(customer => customer.estimate);
  }
}

class GeneratePDFEstimate {
  constructor() {
    this.generatePDFEstimate = (args) => {
      const generics = args.generics;
      const prices = [];
      CustomersModel.findOne({ _id: args.custid })
        .then((cust) => {
          cust.prices.forEach((price, index) => {
            prices.push([price.description, `$${price.amount} +HST`]);
            if (price.option1.description) {
              prices.push(['OR', '']);
              prices.push([price.option1.description, `$${price.option1.amount} +HST`]);
            }
            if (price.option2.description) {
              prices.push(['OR', '']);
              prices.push([price.option2.description, `$${price.option2.amount} +HST`]);
            }
            if (price.option3.description) {
              prices.push(['OR', '']);
              prices.push([price.option3.description, `$${price.option3.amount} +HST`]);
            }
            if (price.option4.description) {
              prices.push(['OR', '']);
              prices.push([price.option4.description, `$${price.option4.amount} +HST`]);
            }
            if (price.option5.description) {
              prices.push(['OR', '']);
              prices.push([price.option5.description, `$${price.option5.amount} +HST`]);
            }
          });
        }).then(() => console.log(prices));

      return setTimeout(() => CustomersModel.findOne({ _id: args.custid })
         .then((customer) => {
           const photos = customer.survey.photos.filter((img) => {
             if (img.selected) {
               return img;
             }
           });
           const base64Images = [];
           photos.forEach((photo) => {
             PhotosModel.findOne({ docID: photo.docID })
               .then((p) => {
                 base64Images.push({ caption: photo.caption, photo: p.base64 });
               });
           });

           return setTimeout(() => {
             pdfMakeEstimate(customer, generics, prices, base64Images, args.text);
             if (!args.preview) {
               sendEmailEstimatetoCustomer(customer);
             }
             return true;
           }, 8000);
         }), 1000);
    };
  }
}

class GetImageBase64 {
  constructor() {
    this.getImageBase64 = args => PhotosModel.findOne({ docID: args.docID }).then(photo => photo);
  }
}

class AddGeneric {
  constructor() {
    this.addGeneric = (args) => {
      const generic = new GenericModel({
        heading: args.heading,
        bulletpoints: args.bulletpoints,
        paragraph: args.paragraph,
        warranty: args.warranty,
      });
      generic.save();
      return { heading: args.heading };
    };
  }
}

class SearchCustomer {
  constructor() {
    this.searchCustomer = (args) => {
     return CustomersModel.find()
         .then((customers) => {
          return customers.filter((customer) => {
            if( (_.includes(customer.firstName, args.searchTerm)) 
              || (_.includes(customer.lastName, args.searchTerm)) 
              || (_.includes(customer.address, args.searchTerm))   
              || (_.includes(customer.email1, args.searchTerm))
              || (_.includes(customer.email2, args.searchTerm))
              || (_.includes(customer.cphone, args.searchTerm))
              || (_.includes(customer.hphone, args.searchTerm))
              || (_.includes(customer.wphone, args.searchTerm))
              ){
              return customer;
            }
          })

         })
    };
  }
}
class GetCustomerPhoto {
  constructor() {
    this.getCustomerPhoto = (args) => {
      let image = {}
      return CustomersModel.findOne({_id: args.custid })
        .then((customer) => {
          customer.survey.photos.forEach((photo) => {
            if(photo.docID === args.docID){
              image = photo;
            }
          })
      })
      .then(() => image)
    };
  }
}


module.exports = {
  GetCustomerPhoto,
  SearchCustomer,
  AddPrice,
  EditPriceAmount,
  EditPriceDescription,
  DeleteNotes,
  GetSurveyLocalPhotos,
  DeletePrice,
  AddGeneric,
  GetImageBase64,
  GeneratePDFEstimate,
  GetEstimateResults,
  GetPrices,
  GetMyCustomers,
  GetQueue,
  AcceptEstimate,
  AddPricing,
  GetFinishedSurvey,
  SelectSurveyPhoto,
  ToggleSurveyReady,
  GetMessages,
  AddSurveyPhoto,
  GetSurveyPhotos,
  Customers,
  Customer,
  NewCustomer,
  UpdateCustomer,
  Address,
  Users,
  User,
  UpdateUser,
  Surveyors,
  GetCustomer,
  UpdateDispatchInfo,
  SubmitCustomer,
  SubmitFollowup,
  GetAppointments,
  AddNotes,
  DeleteAppointment,
  GetUser,
  AddSurveyNotes,
  GetFinishedSurveyQuery,
};
