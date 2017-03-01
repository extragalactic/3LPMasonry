import _ from 'lodash';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import base64Img from 'base64-img';
import randomstring from 'randomstring';
import sharp from 'sharp';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import PricingModel from '../lib/PricingModel';
import QueueModel from '../lib/queueModel';
import PhotosModel from '../lib/PhotosModel';
import GenericModel from '../lib/GenericModel';
import { pdfKitCreateEstimatePreview } from '../methods/pdfKit';
import pdfMakeEstimate from '../methods/pdfMake';

import { sendPushtoEstimators } from '../methods/oneSIgnal';

import { sendSMStoSurveyor, sendSMStoCustomer } from '../methods/twilio';
import { sendEmailSurveytoCustomer } from '../methods/sendInBlue';
import { setMapsLocation } from '../methods/googleMaps';
import { addCustomertoQueue, removeCustomerfromQueue } from '../methods/queue';


sharp.concurrency(1);
dotenv.config();

console.log(base64Img)
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
      const customer = CustomersModel.findOne({ _id: id }, (error, data) => data);
      return customer;
    };
  }
}

class GetCustomer {
  constructor() {
    this.getCustomer = ({ id }) => {
      const customer = CustomersModel.findOne({ _id: id }, (error, data) => data);
      return customer;
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
      const user = UsersModel.findOne({ _id: id }, (error, data) => data);
      return user;
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
               const surveyor = !data.surveyor.id ? true : false;
               const survey = !data.sendSurvey;
               const inquriy = survey && surveyor;
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
      const status = args.description === 'Followup' ? 1 : 2;
      UsersModel.findOne({ _id: args.userid }).then((user) => {
        user.newCustomers = user.newCustomers.map((customer) => {
          if (customer.id === args.custid) {
            customer.status = status;
            return customer;
          } else {
            return customer;
          }
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
      const user = UsersModel.findOne({ _id: args.id }, (error, data) => data);
      return user;
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
      console.log(args)
      CustomersModel.findOne({_id: args.custid})
        .then((customer) => {
          customer.survey.notes.push(payload);
          customer.save();
        });

      UsersModel.findOne({ _id: args.userid })
           .then((user) => {
              user.newCustomers = user.newCustomers.map((customer) => {
                if (customer.id === args.custid) {
                  customer.status = 3;
                  return customer;
                } else {
                  return customer;
                }
              });
             user.save();
           });
    };
  }
 }

class AddSurveyPhoto {
  constructor() {
    this.addSurveyPhoto = (args) => {
      const docID = randomstring.generate(12);
      CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          const folder = customer.firstName + customer.lastName;
          const file = args.heading + randomstring.generate({
            length: 4,
            charset: 'numeric',
          });
          const originalUrl = `https://tlpm.ca/images/${folder}/original/${file}.jpg`;
          const thumbUrl = `https://tlpm.ca/images/${folder}/thumbnail/${file}.jpg`;
          const payload = {
            heading: args.heading,
            description: args.description,
            orginalURL: originalUrl,
            thumbURL: thumbUrl,
            timestamp: args.timestamp,
            user: args.user,
            thumb: thumbUrl,
            photo: originalUrl, // a remote photo or local media url  
            caption: args.heading,
            selected: false,
            docID,
          };
          const saveImagetoDisk = (buffer) => {
            sharp(buffer)
           .toFile(`images/${folder}/original/${file}.jpg`)
              .then(data => console.log('data'))
              .catch(err => console.log('error', err));
            sharp(buffer)
            .resize(200)
            .toFile(`images/${folder}/thumbnail/${file}.jpg`)
              .catch(err => console.log('error', err));
          };
          const buffer = Buffer.from(args.orginalBase64, 'base64');
          fs.access(`images/${folder}`, (err) => {
            if (err && err.code === 'ENOENT') {
              fs.mkdirSync(`images/${folder}`, (err, data) => console.log(err, data));
              fs.mkdirSync(`images/${folder}/thumbnail`, (err, data) => console.log(err, data));
              fs.mkdirSync(`images/${folder}/original`, (err, data) => {
              });
              setTimeout(() => { saveImagetoDisk(buffer); }, 1000);
            } else {
              setTimeout(() => { saveImagetoDisk(buffer); }, 1000);
            }
          });
          customer.survey.photos.push(payload);
          customer.save();
          const photo = new PhotosModel({
            base64: `data:image/jpeg;base64,${args.orginalBase64}`,
            url: originalUrl,
            docID,
          });
         // console.log(photo)
          photo.save();
        });
    };
  }
 }

class GetSurveyPhotos {
  constructor() {
    this.getSurveyPhotos = (args) => {
      return CustomersModel.findOne({ _id: args.id })
        .then(customer => (customer.survey.photos),
        );
    };
  }
 }

class GetMessages {
  constructor() {
    this.getMessages = (args) => {
      const Messages = CustomersModel.findOne({ _id: args.id })
        .then((customer) => {
          if(customer.notes){
             return customer.notes
          }
        });
      return Messages;
    };
  }
 }

class ToggleSurveyReady {
  constructor() {
    this.toggleSurveyReady = (args) => {
      CustomersModel.findOne({ _id: args.custid })
        .then((customer) => {
          if (customer.status === 3) {
            sendPushtoEstimators(customer);
            addCustomertoQueue(customer);
            customer.status = 4;
          } else {
            removeCustomerfromQueue(customer);
            customer.status = 3;
          }
          customer.save();
        });

      UsersModel.findOne({ _id: args.userid })
         .then((user) => {
           user.newCustomers = user.newCustomers.map((customer) => {
                if (customer.id === args.custid) {
                     if(customer.status === 3) {
                       customer.status = 4; 
                     } else if (customer.status === 4) {
                       customer.status = 3;
                     }
               }
               return customer;
           });
           user.save();
         });
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

class AddPricing {
  constructor() {
    this.addPricing = (args) => {
      PricingModel.findOne({description: args.description})
         .then((data) => {
           if (!data) {
             const newPrice = new PricingModel({
               description: args.description,
               price: args.price,
             });
             newPrice.save().then(result => console.log(result)).catch(err => console.log(err));
           }
         });
      CustomersModel.findOne({ _id: args.custid })
          .then((customer) => {
            customer.estimate.prices.push({
              description: args.description,
              price: args.price,
            });
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
              user.estimates.push({
                id: customer._id,
                firstName:customer.firstName,
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
            });
          customer.estimator = args.userid;
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
      };
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
      CustomersModel.findOne({ _id: args.custid })
       .then(customer => pdfMakeEstimate(customer));
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
      console.log(args)
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

module.exports = {
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
};

