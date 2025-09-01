import mongoose from 'mongoose'

const provinsiSchema = new mongoose.Schema({
	kode_pro: {
		type: Number,
		required: true,
		unique: true
	},
	nama_provinsi: {
		type: String,
		required: true
	},
	jumlah_revitalisasi: {
		paud: { type: Number, default: 0 },
		sd: { type: Number, default: 0 },
		smp: { type: Number, default: 0 },
		sma: { type: Number, default: 0 },
		total: { type: Number, default: 0 }
	},
	anggaran_revitalisasi: {
		paud: { type: Number, default: 0 },
		sd: { type: Number, default: 0 },
		smp: { type: Number, default: 0 },
		sma: { type: Number, default: 0 },
		total: { type: Number, default: 0 }
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export default mongoose.model('Provinsi', provinsiSchema)
