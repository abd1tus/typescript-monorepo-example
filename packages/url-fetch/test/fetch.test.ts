import Chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import https from 'https';

import sinon from 'sinon';
import { fetchRedirect } from '../src';

Chai.use(chaiAsPromised);

describe('fetchRedirect', function () {
  const redirectUrl = 'https://somewhere/better';
  let get: sinon.SinonStub;

  before(async function () {
    get = sinon.stub(https, 'get');
  });

  after(function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (https.get as any).restore();
  });

  describe('200', function () {
    it('throws an error', async function () {
      get.yields({
        statusCode: 200,
        headers: { location: redirectUrl },
      });
      await expect(fetchRedirect('https://somewhere/')).to.be.rejectedWith(Error);
    });
  });

  describe('301', function () {
    it('returns the redirect result', async function () {
      get.yields({
        statusCode: 301,
        headers: { location: redirectUrl },
      });
      await expect(fetchRedirect('https://somewhere/')).to.eventually.eql(redirectUrl);
    });
  });
});
