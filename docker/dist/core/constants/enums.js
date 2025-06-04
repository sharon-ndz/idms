"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsFilter = exports.Order = exports.PaymentGateway = exports.RegType = exports.TransactionType = exports.Currency = exports.ApprovalLevel = exports.AccountType = exports.CourseLevel = exports.InspectionStatus = exports.AccountStatus = exports.StatusFilterType = exports.PermitClassType = exports.LicenseStatType = exports.PaymentStatus = exports.CbtStatus = exports.BookingStatus = exports.PreRegistrationStatus = exports.LicenseStatus = exports.ReplacementReason = exports.EmailStatus = exports.DocumentUploadTypes = exports.LicenseFilterRequestType = exports.PermitRequestType = exports.LicenseRequestType = exports.ChangePasswordNextLogin = exports.Sources = exports.sStatus = exports.YesNo = exports.QuestionCategory = exports.DifficultyLevel = exports.Status = exports.ActiveInactiveStatus = exports.Print = exports.Reg = exports.DeviceStatus = exports.DeviceTypes = exports.Self = exports.NotificationTypes = exports.Reference = exports.EmailType = exports.Mod = void 0;
var Mod;
(function (Mod) {
    Mod[Mod["Neutral"] = 0] = "Neutral";
    Mod[Mod["Pending"] = 1] = "Pending";
    Mod[Mod["Approved"] = 2] = "Approved";
    Mod[Mod["Queried"] = 3] = "Queried";
})(Mod || (exports.Mod = Mod = {}));
var EmailType;
(function (EmailType) {
    EmailType["PAYMENT"] = "payment";
    EmailType["DEFAULT"] = "default";
})(EmailType || (exports.EmailType = EmailType = {}));
var Reference;
(function (Reference) {
    Reference[Reference["Unused"] = 0] = "Unused";
    Reference[Reference["Used"] = 1] = "Used";
})(Reference || (exports.Reference = Reference = {}));
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes["Email"] = "email";
})(NotificationTypes || (exports.NotificationTypes = NotificationTypes = {}));
var Self;
(function (Self) {
    Self[Self["True"] = 1] = "True";
    Self[Self["False"] = 0] = "False";
})(Self || (exports.Self = Self = {}));
var DeviceTypes;
(function (DeviceTypes) {
    DeviceTypes["ANDROID"] = "android";
    DeviceTypes["IOS"] = "ios";
})(DeviceTypes || (exports.DeviceTypes = DeviceTypes = {}));
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["APPROVED"] = "approved";
    DeviceStatus["PENDING"] = "pending";
    DeviceStatus["REJECTED"] = "rejected";
    DeviceStatus["DEACTIVATED"] = "deactivated";
})(DeviceStatus || (exports.DeviceStatus = DeviceStatus = {}));
var Reg;
(function (Reg) {
    Reg[Reg["Pending"] = 0] = "Pending";
    Reg[Reg["Approved"] = 1] = "Approved";
    Reg[Reg["Queried"] = 2] = "Queried";
    Reg[Reg["Initiated"] = 3] = "Initiated";
    Reg[Reg["Revalidated"] = 4] = "Revalidated";
    Reg[Reg["Assigned"] = 5] = "Assigned";
    Reg[Reg["InspectionQueried"] = 6] = "InspectionQueried";
})(Reg || (exports.Reg = Reg = {}));
var Print;
(function (Print) {
    Print[Print["pending"] = 0] = "pending";
    Print[Print["complete"] = 1] = "complete";
})(Print || (exports.Print = Print = {}));
var ActiveInactiveStatus;
(function (ActiveInactiveStatus) {
    ActiveInactiveStatus[ActiveInactiveStatus["Active"] = 1] = "Active";
    ActiveInactiveStatus[ActiveInactiveStatus["Inactive"] = 0] = "Inactive";
})(ActiveInactiveStatus || (exports.ActiveInactiveStatus = ActiveInactiveStatus = {}));
var Status;
(function (Status) {
    Status[Status["Active"] = 1] = "Active";
    Status[Status["Inactive"] = 0] = "Inactive";
    Status[Status["Probation"] = 2] = "Probation";
    Status[Status["Suspended"] = 3] = "Suspended";
})(Status || (exports.Status = Status = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel[DifficultyLevel["Easy"] = 1] = "Easy";
    DifficultyLevel[DifficultyLevel["Medium"] = 2] = "Medium";
    DifficultyLevel[DifficultyLevel["Hard"] = 3] = "Hard";
})(DifficultyLevel || (exports.DifficultyLevel = DifficultyLevel = {}));
var QuestionCategory;
(function (QuestionCategory) {
    QuestionCategory[QuestionCategory["DrivingSchoolTest"] = 1] = "DrivingSchoolTest";
    QuestionCategory[QuestionCategory["FRSCTest"] = 2] = "FRSCTest";
})(QuestionCategory || (exports.QuestionCategory = QuestionCategory = {}));
(function (Reference) {
    Reference[Reference["Approved"] = 1] = "Approved";
    Reference[Reference["Rejected"] = 2] = "Rejected";
})(Reference || (exports.Reference = Reference = {}));
var YesNo;
(function (YesNo) {
    YesNo["Yes"] = "yes";
    YesNo["No"] = "no";
})(YesNo || (exports.YesNo = YesNo = {}));
var sStatus;
(function (sStatus) {
    sStatus["Active"] = "Active";
    sStatus["Inactive"] = "Inactive";
})(sStatus || (exports.sStatus = sStatus = {}));
var Sources;
(function (Sources) {
    Sources["PublicPortal"] = "public_portal";
    Sources["AssistedMobile"] = "assisted_mobile";
})(Sources || (exports.Sources = Sources = {}));
var ChangePasswordNextLogin;
(function (ChangePasswordNextLogin) {
    ChangePasswordNextLogin[ChangePasswordNextLogin["True"] = 1] = "True";
    ChangePasswordNextLogin[ChangePasswordNextLogin["False"] = 0] = "False";
})(ChangePasswordNextLogin || (exports.ChangePasswordNextLogin = ChangePasswordNextLogin = {}));
var LicenseRequestType;
(function (LicenseRequestType) {
    LicenseRequestType["New"] = "new";
    LicenseRequestType["Renewal"] = "renewal";
    LicenseRequestType["Replacement"] = "replacement";
})(LicenseRequestType || (exports.LicenseRequestType = LicenseRequestType = {}));
var PermitRequestType;
(function (PermitRequestType) {
    PermitRequestType["New"] = "new";
    PermitRequestType["Renewal"] = "renewal";
})(PermitRequestType || (exports.PermitRequestType = PermitRequestType = {}));
var LicenseFilterRequestType;
(function (LicenseFilterRequestType) {
    LicenseFilterRequestType["All"] = "all";
    LicenseFilterRequestType["New"] = "new";
    LicenseFilterRequestType["Renewal"] = "renewal";
    LicenseFilterRequestType["Replacement"] = "replacement";
})(LicenseFilterRequestType || (exports.LicenseFilterRequestType = LicenseFilterRequestType = {}));
var DocumentUploadTypes;
(function (DocumentUploadTypes) {
    DocumentUploadTypes["FACE"] = "face";
    DocumentUploadTypes["SIGNATURE"] = "signature";
    DocumentUploadTypes["FINGER"] = "finger";
    DocumentUploadTypes["LICENSE"] = "license";
    DocumentUploadTypes["TEST_FILE"] = "testFile";
    DocumentUploadTypes["LOGO"] = "logo";
    DocumentUploadTypes["AVATAR"] = "avatar";
    DocumentUploadTypes["PHYSICAL_ASSESSMENT"] = "physicalAssessment";
    DocumentUploadTypes["HEALTH_DOCUMENT"] = "healthDocument";
})(DocumentUploadTypes || (exports.DocumentUploadTypes = DocumentUploadTypes = {}));
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["Pending"] = "pending";
    EmailStatus["Processing"] = "processing";
    EmailStatus["Completed"] = "completed";
    EmailStatus["Failed"] = "failed";
})(EmailStatus || (exports.EmailStatus = EmailStatus = {}));
var ReplacementReason;
(function (ReplacementReason) {
    ReplacementReason["Damaged"] = "damaged";
    ReplacementReason["Stolen"] = "stolen";
    ReplacementReason["Lost"] = "lost";
})(ReplacementReason || (exports.ReplacementReason = ReplacementReason = {}));
var LicenseStatus;
(function (LicenseStatus) {
    LicenseStatus["Pending"] = "pending";
    LicenseStatus["Processing"] = "processing";
    LicenseStatus["Completed"] = "completed";
    LicenseStatus["Expired"] = "expired";
})(LicenseStatus || (exports.LicenseStatus = LicenseStatus = {}));
var PreRegistrationStatus;
(function (PreRegistrationStatus) {
    PreRegistrationStatus[PreRegistrationStatus["Pending"] = 0] = "Pending";
    PreRegistrationStatus[PreRegistrationStatus["Processing"] = 1] = "Processing";
    PreRegistrationStatus[PreRegistrationStatus["Completed"] = 2] = "Completed";
})(PreRegistrationStatus || (exports.PreRegistrationStatus = PreRegistrationStatus = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["Pending"] = 0] = "Pending";
    BookingStatus[BookingStatus["Booked"] = 1] = "Booked";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var CbtStatus;
(function (CbtStatus) {
    CbtStatus["Scheduled"] = "scheduled";
    CbtStatus["ReScheduled"] = "rescheduled";
    CbtStatus["Failed"] = "failed";
    CbtStatus["Passed"] = "passed";
})(CbtStatus || (exports.CbtStatus = CbtStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "pending";
    PaymentStatus["Completed"] = "completed";
    PaymentStatus["Failed"] = "failed";
    PaymentStatus["Canceled"] = "canceled";
    PaymentStatus["Used"] = "used";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var LicenseStatType;
(function (LicenseStatType) {
    LicenseStatType["All"] = "all";
    LicenseStatType["Renewal"] = "renewal";
    LicenseStatType["Replacement"] = "replacement";
})(LicenseStatType || (exports.LicenseStatType = LicenseStatType = {}));
var PermitClassType;
(function (PermitClassType) {
    PermitClassType[PermitClassType["LearnersPermit"] = 1] = "LearnersPermit";
    PermitClassType[PermitClassType["CoverNote"] = 2] = "CoverNote";
})(PermitClassType || (exports.PermitClassType = PermitClassType = {}));
var StatusFilterType;
(function (StatusFilterType) {
    StatusFilterType["All"] = "all";
    StatusFilterType["Active"] = "active";
    StatusFilterType["Inactive"] = "inactive";
})(StatusFilterType || (exports.StatusFilterType = StatusFilterType = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Approved"] = "approved";
    AccountStatus["Rejected"] = "rejected";
    AccountStatus["Pending"] = "pending";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var InspectionStatus;
(function (InspectionStatus) {
    InspectionStatus["Cleared"] = "cleared";
    InspectionStatus["Queried"] = "queried";
    InspectionStatus["Assigned"] = "assigned";
    InspectionStatus["Approved"] = "approved";
    InspectionStatus["Missed"] = "missed";
    InspectionStatus["ReInspection"] = "re-inspection";
})(InspectionStatus || (exports.InspectionStatus = InspectionStatus = {}));
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["Beginner"] = "beginner";
    CourseLevel["Intermediate"] = "intermediate";
    CourseLevel["Expert"] = "expert";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
var AccountType;
(function (AccountType) {
    AccountType["Users"] = "users";
    AccountType["VerificationUsers"] = "verification_users";
    AccountType["DrivingSchools"] = "driving_schools";
})(AccountType || (exports.AccountType = AccountType = {}));
var ApprovalLevel;
(function (ApprovalLevel) {
    ApprovalLevel[ApprovalLevel["LevelOne"] = 1] = "LevelOne";
    ApprovalLevel[ApprovalLevel["LevelTwo"] = 2] = "LevelTwo";
    ApprovalLevel[ApprovalLevel["LevelThree"] = 3] = "LevelThree";
    ApprovalLevel[ApprovalLevel["LevelFour"] = 4] = "LevelFour";
    ApprovalLevel[ApprovalLevel["LevelFive"] = 5] = "LevelFive";
})(ApprovalLevel || (exports.ApprovalLevel = ApprovalLevel = {}));
var Currency;
(function (Currency) {
    Currency["USD"] = "USD";
    Currency["NGN"] = "NGN";
})(Currency || (exports.Currency = Currency = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["unit"] = "unit";
    TransactionType["newLicense"] = "new_license_payment";
    TransactionType["preRegistration"] = "pre_registration_payment";
    TransactionType["licenseReplacement"] = "license_replacement_payment";
    TransactionType["licenseRenewal"] = "license_renewal_payment";
    TransactionType["drivingSchoolApplication"] = "driving_school_application_payment";
    TransactionType["permitIssuance"] = "permit_payment";
    TransactionType["biometricsPayment"] = "biometrics_payment";
    TransactionType["cbtReschedulePayment"] = "cbt_reschedule_payment";
    TransactionType["inspectionFee"] = "inspection_payment";
    TransactionType["drivingSchoolCompletionPayment"] = "driving_school_completion_payment";
    TransactionType["licenseRenewalMobile"] = "license_renewal_payment_mobile";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var RegType;
(function (RegType) {
    RegType["drivingSchool"] = "driving_school";
    RegType["student"] = "student";
    RegType["applicant"] = "applicant";
})(RegType || (exports.RegType = RegType = {}));
var PaymentGateway;
(function (PaymentGateway) {
    PaymentGateway["FCMB"] = "fcmb";
    PaymentGateway["UNIFIED"] = "unified_payment";
    PaymentGateway["PAYSTACK"] = "paystack";
    PaymentGateway["ALATPAY"] = "alatpay";
})(PaymentGateway || (exports.PaymentGateway = PaymentGateway = {}));
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (exports.Order = Order = {}));
var StatisticsFilter;
(function (StatisticsFilter) {
    StatisticsFilter["DrivingSchools"] = "Driving Schools";
    StatisticsFilter["Students"] = "Students";
    StatisticsFilter["LASDRIOfficers"] = "LASDRI Officers";
    StatisticsFilter["Revenue"] = "Revenue";
})(StatisticsFilter || (exports.StatisticsFilter = StatisticsFilter = {}));
//# sourceMappingURL=enums.js.map