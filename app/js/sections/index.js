var app = angular.module('waybook');

app.controller('LoginController', require('./login/login.controller.js'));
app.controller('RecoverPasswordController', require('./recover-password/recoverPassword.controller.js'));

app.controller('RegisterController', require('./register/register.controller.js'));
app.directive('checkPw', require('./register/checkPw.directive.js'));

app.controller('MainController', require('./main/main.controller.js'));
app.controller('MainTypeController', require('./main/mainType.controller.js'));
app.controller('MainPostController', require('./main/post.controller.js'));
app.controller('ExploreController', require('./explore/explore.controller.js'));
app.controller('ExplorationController', require('./explore/exploration.controller.js'));

app.controller('PlanController', require('./plan/plan.controller.js'));
app.directive('wayTimelineScroll', require('./plan/timelineScroll.directive.js'));

app.controller('UniteController', require('./unite/unite.controller.js'));
app.controller('UniteDetailController', require('./unite/unite.detail.controller.js'));
app.controller('UniteFormController', require('./unite/unite.form.controller.js'));

app.controller('MeController', require('./me/me.controller.js'));
app.controller('MeAccountEditController', require('./me/account/edit.controller.js'));
app.directive('wayFormatDate', require('./me/account/formatDate.directive.js'));
app.directive('passwordMatch', require('./me/account/passwordMatch.directive.js'));
app.controller('MeDiscoveriesController', require('./me/discoveries.controller.js'));
app.controller('MeSponsorsController', require('./me/sponsors.controller.js'));

app.controller('HelpFeedbackController', require('./help-feedback/help-feedback.controller.js'));
app.directive('wayUserVoice', require('./help-feedback/uservoice.directive.js'));
app.controller('AboutController', require('./about/about.controller.js'));
app.controller('IntroController', require('./intro/intro.controller.js'));
app.controller('VerifyController', require('./verify/verify.controller.js'));

app.controller('DashboardController', require('./dashboard/dashboard.controller.js'));

app.controller('GuideMeController', require('./guideme/guideme.controller.js'));

app.controller('SearchController', require('./search/search.controller.js'));
