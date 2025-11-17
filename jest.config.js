export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};