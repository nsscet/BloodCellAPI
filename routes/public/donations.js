var express = require('express')
var router = express.Router()
var Donation = require('../../app/models/donation')


router.route('/getDonations')
    .get(function(req, res) {
        var callback = (err, donations) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Cannot get results. Try again'
                })
            } else {
                if (donations.count > 0) {
                    voluntaryDonations = []
                    for (i = 0; i < donations.count; i++) {

                        donations.donors[i].donor.requirement = "Voluntary"
                        voluntaryDonations.push(donations.donors[i].donor)

                    }
                    res.send({
                        count: voluntaryDonations.length,
                        success: true,
                        voluntaryDonations,
                        message: 'donations successfully returned'
                    })
                } else {
                    res.send({
                        count: donations.count,
                        success: false,
                        message: 'No donations found',
                        res: "Scene contra"

                    })
                }
            }
        }
        Donation.getDonations({}, callback)
    })
module.exports = router