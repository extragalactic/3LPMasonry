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
    getStatus(_, args, ctx) {
      const status = new ctx.constructor.GetStatus();
      return status.getStatus(args);
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
    getFinishedSurveyQuery(_, args, ctx) {
      const survey = new ctx.constructor.GetFinishedSurveyQuery();
      return survey.getFinishedSurveyQuery(args);
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
    deleteNotes(_, args, ctx) {
      const notes = new ctx.constructor.DeleteNotes();
      return notes.deleteNotes(args);
    },
    deleteSurveyNote(_, args, ctx) {
      const notes = new ctx.constructor.DeleteSurveyNote();
      return notes.deleteSurveyNote(args);
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
    getCustomerPhoto(_, args, ctx) {
      const photo = new ctx.constructor.GetCustomerPhoto();
      return photo.getCustomerPhoto(args);
    },
    getSurveyLocalPhotos(_, args, ctx) {
      const photo = new ctx.constructor.GetSurveyLocalPhotos();
      return photo.getSurveyLocalPhotos(args);
    },
    toggleSurveyReady(_, args, ctx) {
      const customer = new ctx.constructor.ToggleSurveyReady();
      return customer.toggleSurveyReady(args);
    },
    selectSurveyPhoto(_, args, ctx) {
      const photos = new ctx.constructor.SelectSurveyPhoto();
      return photos.selectSurveyPhoto(args);
    },
    addPrice(_, args, ctx) {
      const estimate = new ctx.constructor.AddPrice();
      return estimate.addPrice(args);
    },
    addPricing(_, args, ctx) {
      const estimate = new ctx.constructor.AddPricing();
      return estimate.addPricing(args);
    },
    deletePrice(_, args, ctx) {
      const estimate = new ctx.constructor.DeletePrice();
      return estimate.deletePrice(args);
    },
    editPriceDescription(_, args, ctx) {
      const estimate = new ctx.constructor.EditPriceDescription();
      return estimate.editPriceDescription(args);
    },
    editPriceAmount(_, args, ctx) {
      const estimate = new ctx.constructor.EditPriceAmount();
      return estimate.editPriceAmount(args);
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
    searchCustomer(_, args, ctx) {
      const customer = new ctx.constructor.SearchCustomer();
      return customer.searchCustomer(args);
    },
    checkConnection(_, __, ctx) {
      const connection = new ctx.constructor.CheckConnection();
      return connection.checkConnection();
    },
    createDocument(_, args, ctx) {
      const doc = new ctx.constructor.CreateDocument();
      return doc.createDocument(args);
    },
    toggleNoReply(_, args, ctx) {
      const estimate = new ctx.constructor.ToggleNoReply();
      return estimate.toggleNoReply(args);
    },
    saveEstimatePDF(_, args, ctx) {
      const pdf = new ctx.constructor.SaveEstimatePDF();
      return pdf.saveEstimatePDF(args);
    },
    addPriceToHistory(_, args, ctx) {
      const price = new ctx.constructor.AddPriceToHistory();
      return price.addPriceToHistory(args);
    },
     deletePriceFromHistory(_, args, ctx) {
      const price = new ctx.constructor.DeletePriceFromHistory();
      return price.deletePriceFromHistory(args);
    },
     setCustomerStatus(_, args, ctx) {
      const price = new ctx.constructor.SetCustomerStatus();
      return price.setCustomerStatus(args);
    },
    dispatchCustomertoUser(_, args, ctx) {
      const price = new ctx.constructor.DispatchCustomertoUser();
      return price.dispatchCustomertoUser(args);
    },
     deleteSurveyPhoto(_, args, ctx) {
      const price = new ctx.constructor.DeleteSurveyPhoto();
      return price.deleteSurveyPhoto(args);
    },
      deleteCustomerfromSurveyor(_, args, ctx) {
      const price = new ctx.constructor.DeleteCustomerfromSurveyor();
      return price.deleteCustomerfromSurveyor(args);
    },

  },
};
module.exports = resolveFunctions;
