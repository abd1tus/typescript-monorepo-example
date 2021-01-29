import Chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { fetchRedirect } from '../src/fetch';

import https from 'https';
import { IncomingMessage } from 'http';

import sinon from 'sinon';

Chai.use(chaiAsPromised);

describe('fetchRedirect', () => {
  const redirectUrl = 'https://somewhere/better';
  let get: sinon.SinonStub;

  before(async function () {
    get = sinon.stub(https, 'get');
  });

  after(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (https.get as any).restore();
  });

  describe('200', () => {
    it('throws an error', async () => {
      get.yields({
        statusCode: 200,
        headers: { location: redirectUrl },
      });
      await expect(fetchRedirect('https://somewhere/')).to.be.rejectedWith(Error);
    });
  });

  describe('301', () => {
    it('returns the redirect result', async () => {
      get.yields({
        statusCode: 301,
        headers: { location: redirectUrl },
      });
      await expect(fetchRedirect('https://somewhere/')).to.eventually.eql(redirectUrl);
    });
  });
});