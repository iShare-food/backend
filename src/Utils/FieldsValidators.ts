export class FieldValidators {
  static isValidEmail(email: string) {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );
    return emailRegex.test(email);
  }

  static isValidName(name: string) {
    const nameRegex = new RegExp(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]{4,}(?: [a-zA-ZÀ-ÿ\u00f1\u00d1]+){0,2}$/
    );
    return nameRegex.test(name);
  }

  static isValidPhoneNumber(phoneNumber: string) {
    const phoneRegex = new RegExp(/^\(?(\d{2})\)?[- ]?(\d{5})[- ]?(\d{4})$/);
    return phoneRegex.test(phoneNumber);
  }

  static isValidZipCode(zipCode: string) {
    const zipCodeRegex = new RegExp(/^[\d]{5}[-]?[\d]{3}$/g);
    return zipCodeRegex.test(zipCode);
  }

  static isAllUserFieldsValid(
    email: string,
    name: string,
    phoneNumber: string,
    zipCode: string
  ): string {
    let errorMessage = "";

    if (!this.isValidEmail(email)) errorMessage = "Email inválido!";

    if (!this.isValidName(name))
      errorMessage =
        "Nome inválido! Por favor, não usar números ou caractéres especiais.";

    if (!this.isValidPhoneNumber(phoneNumber))
      errorMessage = "Número de telefone inválido";

    if (!this.isValidZipCode(zipCode)) errorMessage = "CEP inválido!";

    return errorMessage;
  }
}
