export class Username {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(username: string) {
    return new Username(username);
  }

  /**
   * Receives a string and normalize it as username.
   *
   * Example: "John Doe" => "john_doe"
   *
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const maxLength = 15; // Setting the maximum number of characters

    const usernameText = text
      .normalize('NFKD') // Remove accentuation
      .trim() // Remove whitespace at the beginning and end
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-z0-9_-]/g, '') // Remove disallowed characters
      .substring(0, maxLength); // Limit to maximum length

    return new Username(usernameText);
  }
}
