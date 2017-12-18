export default class GexHelpers {

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}