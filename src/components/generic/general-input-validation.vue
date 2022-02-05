<template lang="html">
  <span>
    <span
      v-if="hasInvalidInput"
      id="general-input-validation">
      <i class="fa fa-exclamation-circle"></i>
      {{ errorForDisplay }}
    </span>
  </span>
</template>
<script>
export default {
    props: {
        inputValue: {
            required: true
        },
        checkFor: {
            type: Array,
            default: function () {
                return ['whitespace']
            }
        },
        hasError: {
            default: true
        }
    },
    data () {
        return {
            errorForDisplay: '',
        }
    },
    mounted: function () {
        this.$emit('update:hasError', this.hasInvalidInput);
    },
    computed: {
        // Check if a non-object variable has any space because you should not check if an object has any spaces
        hasWhiteSpace () {
            let whiteSpaceRegex = /^[^\s]+(\s+[^\s]+)*$/;
            if(this.inputValue !== "") {
                if (!(this.inputValue instanceof Object) ) {
                return whiteSpaceRegex.test(this.inputValue);
            }
            }
            return true;
        },
        // Check if there are any special charaters
        hasSpecialChars () {
            let specialCharRegex = /^[0-9a-zA-Z\-\_\ ]+$/;
            if (!(this.inputValue instanceof Object)) {
                if(this.inputValue != '') {
                    return !specialCharRegex.test(this.inputValue);
                }
            }
            return false;
        },
        // Check if there are any special charaters or numbers in first name
        hasValidTitle () {
            let validTitle = /^[a-zA-Z0-9 ]*$/;
            if (!(this.inputValue instanceof Object)) {
                return validTitle.test(this.inputValue);
            }
            return true;
        },
         // Check if input has only numbers
        hasNumbers () {
            if(this.inputValue !== undefined) {
                let validNumber = /\b\d{4}\b/;
                if (!(this.inputValue instanceof Object)) {
                    return validNumber.test(this.inputValue);
                }
            }
            return true;
        },
        // Check if there are any special charaters or numbers
        hasValidTags () {
            if(this.inputValue !== undefined) {
                let inputTrim = this.inputValue.trim();
                if (inputTrim.length <= 0) {
                    return true;
                }
                return false;
            }
        },
        // Check if a non-object varaible has uppercase
        hasMinimumChar () {
            if(this.inputValue !== undefined) {
                let inputTrim = this.inputValue.trim();
                if (inputTrim.length < 30) {
                    return false;
                }
            }
            return true;
        },
        // Check if input has any error
        hasInvalidInput () {
            let errorInfo = '';
            let whitespaceError = false;
            let minimumCharError = false;
            let specialCharsError = false;
            let titleHasError = false;
            let tagsHasError = false;
            let numberHasError = false;
            const hasSpace = this.hasWhiteSpace;
            const hasMinimumChar = this.hasMinimumChar;
            const hasSplChars = this.hasSpecialChars;
            const hasValidTitle = this.hasValidTitle;
            const hasValidTags = this.hasValidTags;
            const hasNumbers = this.hasNumbers;

            if (this.checkFor.includes('validtitle')) {
                if (!hasValidTitle) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += ('please enter valid name');
                    titleHasError = true;
                }
            }

            if (this.checkFor.includes('numbers')) {
                if (!hasNumbers) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += ('Please provide only 4 digit numbers');
                    numberHasError = true;
                }
            }

            if (this.checkFor.includes('whitespace')) {
                if (!hasSpace) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += ('should not start/end with whitespaces');
                    whitespaceError = true;
                }
            }
            if (this.checkFor.includes('specialchars')) {
                if (hasSplChars) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += ('cannot have special characters');
                    specialCharsError = true;
                }
            }
            if (this.checkFor.includes('minimumchar')) {
                if (!hasMinimumChar) {
                    errorInfo = errorInfo ? errorInfo + ' AND ' : '';
                    errorInfo += ('description should contain minimum 20 characters');
                    minimumCharError = true;
                }
            }

            this.errorForDisplay = errorInfo;
            return whitespaceError || specialCharsError || titleHasError || minimumCharError || numberHasError ;
        }
    },
    watch: {
        hasInvalidInput: function (val) {
            this.$emit('update:hasError', val);
        }
    }
}
</script>

<style lang="css" scoped>
.span-display-block {
    display: block;
}
.error-message--padding-right {
    padding-right: 6px;
}
#general-input-validation {
    font-size: 13px;
}
#general-input-validation i {
    width: auto;
}
.input--display-none {
    display: none;
}
</style>