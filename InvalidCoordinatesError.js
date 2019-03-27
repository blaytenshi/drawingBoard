class InvalidCoordinatesError extends InvalidInputError {
    constructor(coordinate1, coordinate2) {
        super("Coordinates are neither horizontal or vertical.");
        this.name = "InvalidCoordinatesError";
        this.coordinate1 = coordinate1;
        this.coordinate2 = coordinate2;
    }
}
