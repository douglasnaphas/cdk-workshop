/* globals expect, jest */
const stackname = require("@cdk-turnkey/stackname");

const OLD_ENV = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
  process.env.GITHUB_REPOSITORY = "douglasnaphas/cdk-workshop";
  process.env.GITHUB_REF = "refs/heads/main";
});
afterAll(() => {
  process.env = { ...OLD_ENV };
});

describe("playground", () => {
  test("classes 1", () => {
    class ConfigParam {
      webappParamName: string;
      ssmParamName: string;
      ssmParamValue?: string;
      constructor(webappParamName: string) {
        this.webappParamName = webappParamName;
        this.ssmParamName = stackname(webappParamName);
      }
    }
    const cps: [ConfigParam] = [new ConfigParam("param1")];
    cps[0].ssmParamValue = "something new";
    expect(cps[0].ssmParamValue).toEqual("something new");
  });
});
