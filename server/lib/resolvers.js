const resolveFunctions = {
  Query: {
    customers(_, __, ctx) {
      const customers = new ctx.constructor.Customers();
      return customers.findCustomers();
    },
    customer(_, args, ctx) {
      const customer = new ctx.constructor.Customer();
      return customer.findCustomer(args);
    },

    address(_, args, ctx) {
      const address = new ctx.constructor.Address();
      return address.findAddress(args);
    },

    users(_, __, ctx) {
      const users = new ctx.constructor.Users();
      return users.findUsers();
    },
    user(_, args, ctx) {
      const user = new ctx.constructor.User();
      return user.findUser(args);
    },
    surveyors(_, __, ctx) {
      const surveyors = new ctx.constructor.Surveyors();
      return surveyors.findSurveyors();
    },
    getMessages(_, args, ctx) {
      const message = new ctx.constructor.GetMessages();
      return message.getMessages(args);
    },
    getFinishedSurvey(_, args, ctx) {
      const survey = new ctx.constructor.GetFinishedSurvey();
      return survey.getFinishedSurvey(args);
    },
    getQueue(_, args, ctx) {
      const queue = new ctx.constructor.GetQueue();
      return queue.getQueue(args);
    },
    getMyCustomers(_, args, ctx) {
      const customers = new ctx.constructor.GetMyCustomers();
      return customers.getMyCustomers(args);
    },
    getPrices(_, args, ctx) {
      const prices = new ctx.constructor.GetPrices();
      return prices.getPrices(args);
    },
    getEstimateResults(_, args, ctx) {
      const estimate = new ctx.constructor.GetEstimateResults();
      return estimate.getEstimateResults(args);
    },
  },
  Mutation: {
    newCustomer(_, {
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
      status }, ctx) {
      const newCustomer = new ctx.constructor.NewCustomer();
      return newCustomer.submitCustomer({
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
        status });
    },
    updateCustomer(_, {
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
        status }, ctx) {
      const updateCustomer = new ctx.constructor.UpdateCustomer();
      console.log(notes);
      return updateCustomer.updateCustomer({
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
        status });
    },
    updateUser(_, args, ctx) {
      const users = new ctx.constructor.UpdateUser();
      return users.updateUser(args);
    },

    getCustomer(_, args, ctx) {
      const customer = new ctx.constructor.GetCustomer();
      return customer.getCustomer(args);
    },
    updateDispatchInfo(_, args, ctx) {
      const customer = new ctx.constructor.UpdateDispatchInfo();
      return customer.updateDispatchInfo(args);
    },
    submitCustomer(_, args, ctx) {
      const customer = new ctx.constructor.SubmitCustomer();
      return customer.submitCustomer(args);
    },
    submitFollowup(_, args, ctx) {
      const appointment = new ctx.constructor.SubmitFollowup();
      return appointment.submitFollowup(args);
    },
    getAppointmentsforDay(_, args, ctx) {
      const appointments = new ctx.constructor.GetAppointments();
      return appointments.getAppointments(args);
    },
    addNotes(_, args, ctx) {
      const notes = new ctx.constructor.AddNotes();
      return notes.addNotes(args);
    },
    deleteAppointment(_, args, ctx) {
      const appointment = new ctx.constructor.DeleteAppointment();
      return appointment.deleteAppointment(args);
    },
    getUser(_, args, ctx) {
      const user = new ctx.constructor.GetUser();
      return user.getUser(args);
    },
    addSurveyNotes(_, args, ctx) {
      const notes = new ctx.constructor.AddSurveyNotes();
      return notes.addSurveyNotes(args);
    },
    addSurveyPhoto(_, args, ctx) {
      const photo = new ctx.constructor.AddSurveyPhoto();
      return photo.addSurveyPhoto(args);
    },
    getSurveyPhotos(_, args, ctx) {
      const photo = new ctx.constructor.GetSurveyPhotos();
      return photo.getSurveyPhotos(args);
    },
    toggleSurveyReady(_, args, ctx) {
      const customer = new ctx.constructor.ToggleSurveyReady();
      return customer.toggleSurveyReady(args);
    },
    selectSurveyPhoto(_, args, ctx) {
      const photos = new ctx.constructor.SelectSurveyPhoto();
      return photos.selectSurveyPhoto(args);
    },
    addPricing(_, args, ctx) {
      const estimate = new ctx.constructor.AddPricing();
      return estimate.addPricing(args);
    },
    getFinishedSurvey(_, args, ctx) {
      const survey = new ctx.constructor.GetFinishedSurvey();
      return survey.getFinishedSurvey(args);
    },
    acceptEstimate(_, args, ctx) {
      const customer = new ctx.constructor.AcceptEstimate();
      return customer.acceptEstimate(args);
    },
    getEstimateResults(_, args, ctx) {
      const estimate = new ctx.constructor.GetEstimateResults();
      return estimate.getEstimateResults(args);
    },
    generatePDFEstimate(_, args, ctx) {
      const estimate = new ctx.constructor.GeneratePDFEstimate();
      return estimate.generatePDFEstimate(args);
    },
    getImageBase64(_, args, ctx) {
      const photo = new ctx.constructor.GetImageBase64();
      return photo.getImageBase64(args);
    },
    addGeneric(_, args, ctx) {
      const generic = new ctx.constructor.AddGeneric();
      return generic.addGeneric(args);
    },
  },
};
module.exports = resolveFunctions;


