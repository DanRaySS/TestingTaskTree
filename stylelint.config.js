/** @type {import('stylelint').Config} */
export default {
    extends: [
        "stylelint-config-standard-scss", 
        "stylelint-config-alphabetical-order"
    ],
    rules: {
        'selector-class-pattern': null,
        'no-descending-specificity': null,
        'property-no-unknown': null
    }
};