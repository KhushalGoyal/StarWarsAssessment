import assert from "assert";
import StartWarsService from "../services/StarWars"

const starWarsService = new StartWarsService();
const types = ["planets", "spaceships", "vehicles", "people", "films", "species"]
describe("Star War Test Cases", function () {
    it("a. Get the details on type : " + types[0], function (done) {
        this.timeout(10000)
        starWarsService.getDetais(types[0], null).then((result) => {
            assert.ok(result)
            done()
        })
    })
    it("a. Get the details on type : " + types[1], function (done) {
        this.timeout(10000)
        starWarsService.getDetais(types[0], null).then((result) => {
            assert.ok(result)
            done()
        })
    })
    it("a. Get the details on type : " + types[2], function (done) {
        this.timeout(10000)
        starWarsService.getDetais(types[0], null).then((result) => {
            assert.ok(result)
            done()
        })
    })
    it("a. Get the details on type : " + types[3], function (done) {
        this.timeout(10000)
        starWarsService.getDetais(types[0], null).then((result) => {
            assert.ok(result)
            done()
        })
    })
    it("a. Get the details on type : " + types[4], function (done) {
        this.timeout(10000)
        starWarsService.getDetais(types[0], null).then((result) => {
            assert.ok(result)
            done()
        })
    })
    it("a. Get the details on type : " + types[5], function (done) {
        this.timeout(10000)
        starWarsService.getDetais(types[0], null).then((result) => {
            assert.ok(result)
            done()
        })
    })
})