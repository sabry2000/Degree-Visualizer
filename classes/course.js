class Course {
    _description; //done
    _faculty; //done
    _dept; //done
    _name; //done
    _number; //done
    _professor; //done
    _prereq;
    _coreq;
    _postreq;
    _link; //done
    constructor(dept, number){
        this._dept = dept;
        this._number = number;
    }

    get dept() {
        return this._dept;
    }
    set dept(newDept) {
        this._dept = newDept;
    }
    get number() {
        return this._number;
    }
    set number(newNum) {
        this._number = newNum;
    }
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    get faculty() {
        return this._faculty;
    }
    set faculty(newFaculty) {
        this._faculty = newFaculty;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    get professor() {
        return this._professor;
    }
    set professor(newProf) {
        this._professor = newProf;
    }
    get link() {
        return this._link;
    }
    set link(newLink) {
        this._link = newLink;
    }

}