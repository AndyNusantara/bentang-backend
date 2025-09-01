import Provinsi from '../models/provinsi.js'
import Kabupaten from '../models/kabupaten.js'

export const getProvinsiSummary = async (req, res) => {
	try {
		const kabupaten = await Kabupaten.find()

		// initialize totals
		let total_paud = 0,
			total_sd = 0,
			total_smp = 0,
			total_sma = 0
		let anggaran_paud = 0,
			anggaran_sd = 0,
			anggaran_smp = 0,
			anggaran_sma = 0

		// sum all kabupaten data
		kabupaten.forEach((k) => {
			total_paud += k.jumlah_revitalisasi.paud || 0
			total_sd += k.jumlah_revitalisasi.sd || 0
			total_smp += k.jumlah_revitalisasi.smp || 0
			total_sma += k.jumlah_revitalisasi.sma || 0

			anggaran_paud += k.anggaran_revitalisasi.paud || 0
			anggaran_sd += k.anggaran_revitalisasi.sd || 0
			anggaran_smp += k.anggaran_revitalisasi.smp || 0
			anggaran_sma += k.anggaran_revitalisasi.sma || 0
		})

		const data = {
			total_revitalisasi_sekolah: total_paud + total_sd + total_smp + total_sma,
			anggaran_total_revitalisasi_sekolah:
				anggaran_paud + anggaran_sd + anggaran_smp + anggaran_sma,
			per_tingkat: {
				paud: { jumlah: total_paud, anggaran: anggaran_paud },
				sd: { jumlah: total_sd, anggaran: anggaran_sd },
				smp: { jumlah: total_smp, anggaran: anggaran_smp },
				sma: { jumlah: total_sma, anggaran: anggaran_sma }
			}
		}

		res.status(200).json({ success: true, data })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Gagal mengambil data summary provinsi dari kabupaten',
			error: error.message
		})
	}
}

export const getTable = async (req, res) => {
	try {
		const kabupaten = await Kabupaten.find()

		// Group kabupaten by province
		const provinsiMap = new Map()

		kabupaten.forEach((k) => {
			if (!provinsiMap.has(k.kode_pro)) {
				provinsiMap.set(k.kode_pro, {
					kode_wilayah: k.kode_pro,
					nama_wilayah: k.nama_kabupaten,
					data_sekolah: [
						{ bentuk_pendidikan: 'PAUD', banyak_sekolah: 0, anggaran: 0 },
						{ bentuk_pendidikan: 'SD', banyak_sekolah: 0, anggaran: 0 },
						{ bentuk_pendidikan: 'SMP', banyak_sekolah: 0, anggaran: 0 },
						{ bentuk_pendidikan: 'SMA', banyak_sekolah: 0, anggaran: 0 }
					],
					total_sekolah: 0,
					total_anggaran: 0
				})
			}

			const provData = provinsiMap.get(k.kode_pro)

			// Sum each level
			provData.data_sekolah.forEach((level) => {
				const key = level.bentuk_pendidikan.toLowerCase()
				level.banyak_sekolah += k.jumlah_revitalisasi[key] || 0
				level.anggaran += k.anggaran_revitalisasi[key] || 0
			})

			// Update totals
			provData.total_sekolah +=
				(k.jumlah_revitalisasi.paud || 0) +
				(k.jumlah_revitalisasi.sd || 0) +
				(k.jumlah_revitalisasi.smp || 0) +
				(k.jumlah_revitalisasi.sma || 0)

			provData.total_anggaran +=
				(k.anggaran_revitalisasi.paud || 0) +
				(k.anggaran_revitalisasi.sd || 0) +
				(k.anggaran_revitalisasi.smp || 0) +
				(k.anggaran_revitalisasi.sma || 0)
		})

		const data = Array.from(provinsiMap.values())

		res.status(200).json({
			success: true,
			status: 'success',
			message: 'Data berhasil dimuat',
			data
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			status: 'error',
			message: 'Gagal mengambil data summary provinsi',
			error: error.message
		})
	}
}

// Get statistics
export const getSummaryByProvinsi = async (req, res) => {
	try {
		const { kode } = req.params // expects /summary/:kode_prov

		if (!kode) {
			return res.status(400).json({
				success: false,
				message: 'kode_prov harus diberikan'
			})
		}

		// Fetch Kabupaten for that province
		const kabupaten = await Kabupaten.find({ kode_pro: Number(kode) })

		if (kabupaten.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'Tidak ada data kabupaten untuk kode_prov ini'
			})
		}

		// Initialize totals
		let total_paud = 0,
			total_sd = 0,
			total_smp = 0,
			total_sma = 0
		let anggaran_paud = 0,
			anggaran_sd = 0,
			anggaran_smp = 0,
			anggaran_sma = 0

		kabupaten.forEach((k) => {
			total_paud += k.jumlah_revitalisasi.paud || 0
			total_sd += k.jumlah_revitalisasi.sd || 0
			total_smp += k.jumlah_revitalisasi.smp || 0
			total_sma += k.jumlah_revitalisasi.sma || 0

			anggaran_paud += k.anggaran_revitalisasi.paud || 0
			anggaran_sd += k.anggaran_revitalisasi.sd || 0
			anggaran_smp += k.anggaran_revitalisasi.smp || 0
			anggaran_sma += k.anggaran_revitalisasi.sma || 0
		})

		const data = {
			total_revitalisasi_sekolah: total_paud + total_sd + total_smp + total_sma,
			anggaran_total_revitalisasi_sekolah:
				anggaran_paud + anggaran_sd + anggaran_smp + anggaran_sma,
			per_tingkat: {
				paud: { jumlah: total_paud, anggaran: anggaran_paud },
				sd: { jumlah: total_sd, anggaran: anggaran_sd },
				smp: { jumlah: total_smp, anggaran: anggaran_smp },
				sma: { jumlah: total_sma, anggaran: anggaran_sma }
			}
		}

		res.status(200).json({ success: true, data })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Gagal mengambil data summary provinsi',
			error: error.message
		})
	}
}

export const getTableByProvinsi = async (req, res) => {
	try {
		const { kode } = req.params
		const kabupaten = await Kabupaten.find({ kode_pro: kode })

		const tableData = kabupaten.map((k) => {
			const data_sekolah = [
				{
					bentuk_pendidikan: 'PAUD',
					banyak_sekolah: k.jumlah_revitalisasi.paud || 0,
					anggaran: k.anggaran_revitalisasi.paud || 0
				},
				{
					bentuk_pendidikan: 'SD',
					banyak_sekolah: k.jumlah_revitalisasi.sd || 0,
					anggaran: k.anggaran_revitalisasi.sd || 0
				},
				{
					bentuk_pendidikan: 'SMP',
					banyak_sekolah: k.jumlah_revitalisasi.smp || 0,
					anggaran: k.anggaran_revitalisasi.smp || 0
				},
				{
					bentuk_pendidikan: 'SMA',
					banyak_sekolah: k.jumlah_revitalisasi.sma || 0,
					anggaran: k.anggaran_revitalisasi.sma || 0
				}
			]

			const total_sekolah = data_sekolah.reduce(
				(sum, item) => sum + item.banyak_sekolah,
				0
			)
			const total_anggaran = data_sekolah.reduce(
				(sum, item) => sum + item.anggaran,
				0
			)

			return {
				kode_wilayah: k.kode_kab,
				nama_wilayah: k.nama_kabupaten,
				data_sekolah,
				total_sekolah,
				total_anggaran
			}
		})

		res.status(200).json({
			success: true,
			status: 'success',
			message: 'Data berhasil dimuat',
			data: tableData
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Gagal mengambil data table provinsi',
			error: error.message
		})
	}
}
