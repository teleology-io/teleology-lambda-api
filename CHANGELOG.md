## [2.1.1](https://github.com/icarus-sullivan/teleology-lambda-api/compare/v2.1.0...v2.1.1) (2020-11-04)


### Bug Fixes

* fix return from wrapper.  rest param was turning a string response into an array.  also removed extraneous Response and related files ([2d3d7d4](https://github.com/icarus-sullivan/teleology-lambda-api/commit/2d3d7d46082a0a239c3075bfac5b8c6703458b9e))



# [2.1.0](https://github.com/icarus-sullivan/teleology-lambda-api/compare/v2.0.0...v2.1.0) (2020-11-03)



# [2.0.0](https://github.com/icarus-sullivan/teleology-lambda-api/compare/1.0.0...2.0.0) (2020-11-03)


### Bug Fixes

* return unwrapped value from wrapper, rather than object with response code and body, as AWS will wrap in Payload and serialize, which is simpler. ([7aa3fe5](https://github.com/icarus-sullivan/teleology-lambda-api/commit/7aa3fe559646cdce1d100717090deacba3eb9bde))



# 1.0.0 (2020-11-03)


### Bug Fixes

* don't retrun a success response for errors in wrapper ([f7db49a](https://github.com/icarus-sullivan/teleology-lambda-api/commit/f7db49a9c2f19eb174c4b3be66553f566f393302))



