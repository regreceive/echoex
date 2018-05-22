import FieldGroup from './FieldGroup';

class EmailFieldGroup extends FieldGroup {
  re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/i;

  getValidationState() {
    if (this.state.value.length === 0) {
      return null;
    }
    return this.re.test(this.state.value) ? 'success' : 'error';
  }
}

export default EmailFieldGroup;
