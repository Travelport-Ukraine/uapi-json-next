import { Air } from 'uapi-json-types';
import { request } from './request';
import { config } from 'dotenv';

config();

/**
 * Request params are ugly a bit but at the same time are strictly typed.
 * You know what to send by just matching the type. No need of any templates.
 *
 * Drawback of such approach is a need to pass empty arrays like searchSpecificAirSegment
 *
 * Tip: try removing any of fields in a leg and you'll receive an error
 */
const params: Air.Definitions.LowFareSearchReq = {
    targetBranch: process.env.BRANCH,
    billingPointOfSaleInfo: { originApplication: 'uAPI' },
    searchAirLeg: [{
        searchOrigin:  [{ airport: { code: 'KBP' } }],
        searchDestination: [{ airport: { code: 'PRG' } }],
        searchDepTime: [{ preferredTime: '2019-11-11' }],
        searchArvTime: [{ preferredTime: '2019-12-12' }],
    }],
    searchSpecificAirSegment: [],
    searchPassenger: [{ code: 'ADT' }]
};

request(params).then(response => {
    /**
     * Here we receive response of type Air.Definitions.LowFareSearchRsp
     * So we can easily map over segments list and get all of them without a problem.
     *
     * One more cool thing that all keys are in normal keys and don't have any implicit
     * transformations.
     */
    console.log(response.airSegmentList.airSegment.map(segment => {
        return segment
    }));
});




