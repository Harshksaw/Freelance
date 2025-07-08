import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
  companyName: string;
  companyNumber?: string;
  businessTurnover: number;
  fundingType: string;
  purpose: string;
  loanAmount: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const DealSchema = new Schema<IDeal>({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [255, 'Company name cannot exceed 255 characters']
  },
  companyNumber: {
    type: String,
    trim: true,
    maxlength: [50, 'Company number cannot exceed 50 characters']
  },
  businessTurnover: {
    type: Number,
    required: [true, 'Business turnover is required'],
    min: [0, 'Business turnover must be positive']
  },
  fundingType: {
    type: String,
    required: true,
    default: 'Loans',
    enum: ['Loans', 'Invoice Finance', 'Asset Finance', 'Overdraft', 'Other']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required'],
    enum: ['Cash Flow Boost', 'New Equipment', 'Expansion', 'Refinance', 'Other']
  },
  loanAmount: {
    type: Number,
    required: [true, 'Loan amount is required'],
    min: [1000, 'Minimum loan amount is £1,000'],
    max: [10000000, 'Maximum loan amount is £10,000,000']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Index for better search performance
DealSchema.index({ companyName: 'text' });
DealSchema.index({ createdAt: -1 });

export default mongoose.models.Deal || mongoose.model<IDeal>('Deal', DealSchema);