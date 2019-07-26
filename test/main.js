const SupplyChain = artifacts.require("./SupplyChain.sol");

contract('SupplyChain', function (accounts) {

    let supplyChainInstance;

    beforeEach(async () => {
        supplyChainInstance = await SupplyChain.new()
    })

    it("Run Steps Creation", async () => {
        let step_0 = await supplyChainInstance.newStep("0", []);
        let step_1 = await supplyChainInstance.newStep("1", []);
        let step_2 = await supplyChainInstance.newStep("2", []);
        let step_3 = await supplyChainInstance.newStep("3", ["0", "1", "2"]);
        let step_4 = await supplyChainInstance.newStep("4", ["3"]);

        assert.strictEqual(step_0.logs[0].event, "StepCreated", "StepCreated event was not emitted!");
        assert.strictEqual(step_0.logs[0].args.step.toString(), "0", "step count is not 0");

        assert.strictEqual(step_1.logs[0].event, "StepCreated", "StepCreated event was not emitted!");
        assert.strictEqual(step_1.logs[0].args.step.toString(), "1", "step count is not 1");

        assert.strictEqual(step_2.logs[0].event, "StepCreated", "StepCreated event was not emitted!");
        assert.strictEqual(step_2.logs[0].args.step.toString(), "2", "step count is not 2");

        assert.strictEqual(step_3.logs[0].event, "StepCreated", "StepCreated event was not emitted!");
        assert.strictEqual(step_3.logs[0].args.step.toString(), "3", "step count is not 3");

        assert.strictEqual(step_4.logs[0].event, "StepCreated", "StepCreated event was not emitted!");
        assert.strictEqual(step_4.logs[0].args.step.toString(), "4", "step count is not 4");

        assert.strictEqual((await supplyChainInstance.getprecedents(step_3.logs[0].args.step.toString())).toString(), "0,1,2", "bad _precedents")
    });
});