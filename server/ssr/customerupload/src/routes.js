export default (
  <Route path={'/'}>
    <IndexRedirect to="/home" />
    <Route path={'/home'} component={App} />
    <Route path="/handbook" component={HandbookContainer} />
  </Route>
  );

