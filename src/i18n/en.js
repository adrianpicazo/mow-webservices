import * as TR from './constants';

const translations = [];

translations[TR.TR_APP_NAME] = 'Meals On Wheels';
translations[TR.TR_WELCOME] = 'Welcome';


// --- BUTTONS -------------------------------------------------------------------------------------

translations[TR.TR_BUTTON_LOGIN] = 'Log in';
translations[TR.TR_BUTTON_SIGN_IN] = 'Sign in';
translations[TR.TR_BUTTON_ACCEPT] = 'Accept';
translations[TR.TR_BUTTON_CANCEL] = 'Cancel';
translations[TR.TR_BUTTON_ALL] = 'All';
translations[TR.TR_BUTTON_NONE] = 'None';
translations[TR.TR_BUTTON_ADD_DISHES] = 'Add dishes';
translations[TR.TR_BUTTON_ORDERING] = 'Ordering';
translations[TR.TR_BUTTON_COMPLETE_ORDER] = 'Complete order';
translations[TR.TR_BUTTON_BACK_TO_RESTAURANTS] = 'Back to restaurants';


// --- MENUS ---------------------------------------------------------------------------------------

translations[TR.TR_MENU_ADDRESSES] = 'Addresses';
translations[TR.TR_MENU_ORDERS] = 'Orders';
translations[TR.TR_MENU_SETTINGS] = 'Settings';
translations[TR.TR_MENU_LOGOUT] = 'Log out';


// --- FORMS ---------------------------------------------------------------------------------------

translations[TR.TR_LABEL_NAME] = 'Name';
translations[TR.TR_LABEL_SURNAMES] = 'Surnames';
translations[TR.TR_LABEL_EMAIL] = 'Email';
translations[TR.TR_LABEL_PASSWORD] = 'Password';
translations[TR.TR_LABEL_REPEAT_PASSWORD] = 'Repeat password';
translations[TR.TR_LABEL_ENTER_ADDRESS] = 'Enter your address';

translations[TR.TR_PLACEHOLDER_NAME] = 'Adrián';
translations[TR.TR_PLACEHOLDER_SURNAMES] = 'Picazo Marín';
translations[TR.TR_PLACEHOLDER_EMAIL] = 'email@gmail.com';
translations[TR.TR_PLACEHOLDER_PASSWORD] = '********';
translations[TR.TR_PLACEHOLDER_REPEAT_PASSWORD] = '********';
translations[TR.TR_PLACEHOLDER_ADDRESS] = 'Partida Benadresa, 90, Castelló de la Plana';


// --- SCREENS -------------------------------------------------------------------------------------

translations[TR.TR_HEADER_LOGIN] = 'Login';
translations[TR.TR_HEADER_SIGN_IN] = 'Registration';
translations[TR.TR_HEADER_RESTAURANT_LIST] = 'Restaurants';
translations[TR.TR_HEADER_RESTAURANT_INFO] = 'Restaurant information';
translations[TR.TR_HEADER_CATEGORY_INFO] = 'Products';
translations[TR.TR_HEADER_USER_ADDRESSES] = 'My addresses';
translations[TR.TR_HEADER_USER_ORDER] = 'My order';
translations[TR.TR_HEADER_USER_ORDERS] = 'My orders';
translations[TR.TR_HEADER_USER_SETTINGS] = 'Settings';
translations[TR.TR_HEADER_USER_ORDER_DONE] = 'My order done';

translations[TR.TR_HEADER_MODAL_RESTAURANT_TYPES] = 'Types of restaurant';
translations[TR.TR_HEADER_MODAL_ADDRESS_FORM] = 'Enter an address';
translations[TR.TR_HEADER_MODAL_ORDER_RESET] = 'Pending order';
translations[TR.TR_HEADER_MODAL_LANGUAGE_SELECTION] = 'Select a language';

translations[TR.TR_BODY_REGISTERED_ADDRESSES] = 'Registered addresses';
translations[TR.TR_BODY_REGISTERED_ORDERS] = 'Registered orders';
translations[TR.TR_BODY_ORDER_SUMMARY] = 'Order summary';
translations[TR.TR_BODY_ORDER_TOTAL] = 'Total';
translations[TR.TR_BODY_ORDER_SUBTOTAL] = 'Subtotal';
translations[TR.TR_BODY_ORDER_EMPTY] = 'Empty order';
translations[TR.TR_BODY_ORDER_CHOOSE_SOMETHING] = 'Choose something tasty';
translations[TR.TR_BODY_ORDER_PRODUCTS] = 'Products';
translations[TR.TR_BODY_ORDER_TOTAL_TITLE] = 'Total order';
translations[TR.TR_BODY_ORDER_SHIPPING_ADDRESS] = 'Shipping address';
translations[TR.TR_BODY_ORDER_SUCCESS] = 'Successful\norder';
translations[TR.TR_BODY_SETTINGS_LANGUAGE] = 'Language';
translations[TR.TR_BODY_SETTINGS_CHANGE] = 'Change';

translations[TR.TR_BODY_MODAL_ORDER_RESET_1] = 'You still have a pending order with another ' +
    'restaurant. If you access another restaurant, the pending order will be canceled.';
translations[TR.TR_BODY_MODAL_ORDER_RESET_2] = 'Do you wish to continue?';


// --- FEEDBACK MESSAGES ---------------------------------------------------------------------------

translations[TR.TR_TITLE_FAILURE_LOGIN] = 'LOGIN FAILURE';
translations[TR.TR_TITLE_FAILURE_SIGN_IN] = 'SIGN IN FAILURE';
translations[TR.TR_TITLE_FAILURE_REGISTRATION] = 'REGISTRATION FAILURE';
translations[TR.TR_TITLE_FAILURE_ERASING] = 'ERASING FAILURE';
translations[TR.TR_TITLE_FAILURE_OBTAINING_DATA] = 'OBTAINING DATA FAILURE';
translations[TR.TR_TITLE_FAILURE_FORM] = 'FORM FAILURE';
translations[TR.TR_TITLE_FAILURE_ORDER] = 'ORDER FAILURE';

translations[TR.TR_TITLE_SUCCESS_LOGIN] = 'LOGIN SUCCESS';
translations[TR.TR_TITLE_SUCCESS_SIGN_IN] = 'SIGN IN SUCCESS';

translations[TR.TR_BODY_FAILURE_LOGIN] = 'There has been a failure in access.';
translations[TR.TR_BODY_FAILURE_SIGN_IN] = 'There has been a failure in the registration.';
translations[TR.TR_BODY_FAILURE_ORDER_1] = 'We are very sorry!';
translations[TR.TR_BODY_FAILURE_ORDER_2] = 'There was a failure to place the order.';
translations[TR.TR_BODY_FAILURE_ORDER_3] = 'Please, place the order again.';
translations[TR.TR_BODY_SUCCESS_LOGIN] = 'You have accessed correctly.';
translations[TR.TR_BODY_SUCCESS_SIGN_IN] = 'It has been successfully registered.';

translations[TR.TR_ERROR_EMPTY_FIELDS] = 'There are empty fields.';
translations[TR.TR_ERROR_PASSWORDS_NOT_MATCH] = 'Passwords do not match.';
translations[TR.TR_ERROR_NO_DATA] = 'There is no data.';
translations[TR.TR_ERROR_REPEATED_ADDRESS] = 'Repeated address.';
translations[TR.TR_ERROR_NO_ADDRESSES] = 'There are no registered addresses.';


// --- LANGUAGES -----------------------------------------------------------------------------------

translations[TR.TR_LANGUAGE_SPANISH] = 'Spanish';
translations[TR.TR_LANGUAGE_ENGLISH] = 'English';


export default translations;
