import mongoose from 'mongoose'

const kabupatenSchema = new mongoose.Schema({
	kode_pro: {
		type: mongoose.Schema.Types.Number,
		ref: 'Provinsi',
		required: true
	},
	kode_kab: {
		type: Number,
		required: true
	},
	nama_kabupaten: {
		type: String,
		required: true,
		trim: true
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

kabupatenSchema.index({ kode_kab: 1, provinsi: 1 }, { unique: true })

export default mongoose.model('Kabupaten', kabupatenSchema)
