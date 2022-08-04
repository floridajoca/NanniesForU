'use strict';

import { userTypeValidation } from "./app/utils/validateUserType.js";

userTypeValidation();

Router.init("main-area", [
    new Page("#home", 'app/Home.html'),
    new Page("#about", 'app/About.html'),
    new Page("#profile", 'app/Profile.html'),
    new Page("#nannyprofilelist", 'app/NannyProfileList.html'),
    new Page("#signup", 'app/SignUp.html'),
    new Page("#login", 'app/Login.html'),
    new Page("#parentprofilelist", 'app/ParentProfileList.html'),
    new Page("#usersettings", 'app/UserSettings.html'),
    new Page("#parentjobpost", 'app/ParentJobDetails.html'),
    new Page("#nannyprofiledetails", 'app/NannyProfileDetails.html'),
    new Page("#nannyprofilelist", 'app/NannyProfileList.html'),
    new Page("#usersettings", 'app/UserSettings.html'),
    new Page("#contactus", 'app/ContactUs.html'),
    new Page("#terms", 'app/Terms.html'),
    new Page("#help", 'app/Help.html'),
]);
