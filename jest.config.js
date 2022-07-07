module.exports = {
  moduleNameMapper: {
    "\\.(css|less|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/image.mock.js",
    '@app/(.*)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>'
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  testURL: "http://localhost/",
  testEnvironment: "jsdom",
}