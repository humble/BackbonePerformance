class Friends extends Backbone.Collection {
  initialize() {
    this.chance = new Chance();
  }
  addFriends(number) {
    for (var i = 0; i < number; i++) {
      this.add({
        name: this.chance.first(),
        gender: this.chance.gender(),
        birthday: this.chance.birthday({ string: true })
      })
    }
  }
}

Friends.prototype.model = Friend;