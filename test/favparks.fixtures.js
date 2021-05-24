function makeFavparksArray() {
  return [
    {
      favParkId: 1,
      userid: 1,
      parkcode: "acad",
      statecode: "ME",
      parkname: "Acadia National Park",
      rating: 1,
      note: "note for park 1",
      statename: "Maine",
      activity: "Arts and Culture",
      parknum: 1,
      parkdata: {},
    },
    {
      favParkId: 2,
      userid: 1,
      parkcode: "bicr",
      statecode: "AL",
      parkname: "Birmingham Civil Rights National Monument",
      rating: 2,
      note: "note for Birmingham Civil Rights National Monument park",
      statename: "Alabama",
      activity: "Biking",
      parknum: 2,
      parkdata: {},
    },
  ];
}

module.exports = {
  makeFavparksArray,
}
