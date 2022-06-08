class Professor {
    constructor(name, bio, rating) {
        this._name = name;
        this._bio = bio;
        this._rating = rating;
    }

    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    get bio() {
        return this._bio;
    }
    set bio(newBio) {
        this._bio = newBio; 
    }
    get rating() {
        return this._rating;
    }
    set rating(newRating) {
        this._rating = newRating;
    }
}