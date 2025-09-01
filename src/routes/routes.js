import express from 'express'
import {
	getProvinsiSummary,
	getSummaryByProvinsi,
	getTable,
	getTableByProvinsi
} from '../controllers/region.js'

const router = express.Router()

router.get('/provinsi', getProvinsiSummary)
router.get('/table', getTable)

router.get('/provinsi/:kode', getSummaryByProvinsi)
router.get('/table/:kode', getTableByProvinsi)

export default router
