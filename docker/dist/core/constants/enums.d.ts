export declare enum Mod {
    Neutral = 0,
    Pending = 1,
    Approved = 2,
    Queried = 3
}
export declare enum EmailType {
    PAYMENT = "payment",
    DEFAULT = "default"
}
export declare enum Reference {
    Unused = 0,
    Used = 1
}
export declare enum NotificationTypes {
    Email = "email"
}
export declare enum Self {
    True = 1,
    False = 0
}
export declare enum DeviceTypes {
    ANDROID = "android",
    IOS = "ios"
}
export declare enum DeviceStatus {
    APPROVED = "approved",
    PENDING = "pending",
    REJECTED = "rejected",
    DEACTIVATED = "deactivated"
}
export declare enum Reg {
    Pending = 0,
    Approved = 1,
    Queried = 2,
    Initiated = 3,
    Revalidated = 4,
    Assigned = 5,
    InspectionQueried = 6
}
export declare enum Print {
    pending = 0,
    complete = 1
}
export declare enum ActiveInactiveStatus {
    Active = 1,
    Inactive = 0
}
export declare enum Status {
    Active = 1,
    Inactive = 0,
    Probation = 2,
    Suspended = 3
}
export declare enum DifficultyLevel {
    Easy = 1,
    Medium = 2,
    Hard = 3
}
export declare enum QuestionCategory {
    DrivingSchoolTest = 1,
    FRSCTest = 2
}
export declare enum Reference {
    Approved = 1,
    Rejected = 2
}
export declare enum YesNo {
    Yes = "yes",
    No = "no"
}
export declare enum sStatus {
    Active = "Active",
    Inactive = "Inactive"
}
export declare enum Sources {
    PublicPortal = "public_portal",
    AssistedMobile = "assisted_mobile"
}
export declare enum ChangePasswordNextLogin {
    True = 1,
    False = 0
}
export declare enum LicenseRequestType {
    New = "new",
    Renewal = "renewal",
    Replacement = "replacement"
}
export declare enum PermitRequestType {
    New = "new",
    Renewal = "renewal"
}
export declare enum LicenseFilterRequestType {
    All = "all",
    New = "new",
    Renewal = "renewal",
    Replacement = "replacement"
}
export declare enum DocumentUploadTypes {
    FACE = "face",
    SIGNATURE = "signature",
    FINGER = "finger",
    LICENSE = "license",
    TEST_FILE = "testFile",
    LOGO = "logo",
    AVATAR = "avatar",
    PHYSICAL_ASSESSMENT = "physicalAssessment",
    HEALTH_DOCUMENT = "healthDocument"
}
export declare enum EmailStatus {
    Pending = "pending",
    Processing = "processing",
    Completed = "completed",
    Failed = "failed"
}
export declare enum ReplacementReason {
    Damaged = "damaged",
    Stolen = "stolen",
    Lost = "lost"
}
export declare enum LicenseStatus {
    Pending = "pending",
    Processing = "processing",
    Completed = "completed",
    Expired = "expired"
}
export declare enum PreRegistrationStatus {
    Pending = 0,
    Processing = 1,
    Completed = 2
}
export declare enum BookingStatus {
    Pending = 0,
    Booked = 1
}
export declare enum CbtStatus {
    Scheduled = "scheduled",
    ReScheduled = "rescheduled",
    Failed = "failed",
    Passed = "passed"
}
export declare enum PaymentStatus {
    Pending = "pending",
    Completed = "completed",
    Failed = "failed",
    Canceled = "canceled",
    Used = "used"
}
export declare enum LicenseStatType {
    All = "all",
    Renewal = "renewal",
    Replacement = "replacement"
}
export declare enum PermitClassType {
    LearnersPermit = 1,
    CoverNote = 2
}
export declare enum StatusFilterType {
    All = "all",
    Active = "active",
    Inactive = "inactive"
}
export declare enum AccountStatus {
    Approved = "approved",
    Rejected = "rejected",
    Pending = "pending"
}
export declare enum InspectionStatus {
    Cleared = "cleared",
    Queried = "queried",
    Assigned = "assigned",
    Approved = "approved",
    Missed = "missed",
    ReInspection = "re-inspection"
}
export declare enum CourseLevel {
    Beginner = "beginner",
    Intermediate = "intermediate",
    Expert = "expert"
}
export declare enum AccountType {
    Users = "users",
    VerificationUsers = "verification_users",
    DrivingSchools = "driving_schools"
}
export declare enum ApprovalLevel {
    LevelOne = 1,
    LevelTwo = 2,
    LevelThree = 3,
    LevelFour = 4,
    LevelFive = 5
}
export declare enum Currency {
    USD = "USD",
    NGN = "NGN"
}
export declare enum TransactionType {
    unit = "unit",
    newLicense = "new_license_payment",
    preRegistration = "pre_registration_payment",
    licenseReplacement = "license_replacement_payment",
    licenseRenewal = "license_renewal_payment",
    drivingSchoolApplication = "driving_school_application_payment",
    permitIssuance = "permit_payment",
    biometricsPayment = "biometrics_payment",
    cbtReschedulePayment = "cbt_reschedule_payment",
    inspectionFee = "inspection_payment",
    drivingSchoolCompletionPayment = "driving_school_completion_payment",
    licenseRenewalMobile = "license_renewal_payment_mobile"
}
export declare enum RegType {
    drivingSchool = "driving_school",
    student = "student",
    applicant = "applicant"
}
export declare enum PaymentGateway {
    FCMB = "fcmb",
    UNIFIED = "unified_payment",
    PAYSTACK = "paystack",
    ALATPAY = "alatpay"
}
export declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum StatisticsFilter {
    DrivingSchools = "Driving Schools",
    Students = "Students",
    LASDRIOfficers = "LASDRI Officers",
    Revenue = "Revenue"
}
