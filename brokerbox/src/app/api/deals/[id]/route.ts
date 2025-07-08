import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/database/mongodb';
import Deal from '../../../../lib/database/models/deal';
import { Types } from 'mongoose';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Validate ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid deal ID' },
        { status: 400 }
      );
    }

    // Find and delete the deal
    const deletedDeal = await Deal.findByIdAndDelete(id);

    if (!deletedDeal) {
      return NextResponse.json(
        { success: false, error: 'Deal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Deal deleted successfully',
      deal: {
        id: deletedDeal._id.toString(),
        companyName: deletedDeal.companyName
      }
    });

  } catch (error) {
    console.error('Delete deal error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete deal' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Validate ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid deal ID' },
        { status: 400 }
      );
    }

    // Find the deal - Remove .lean() to get proper Mongoose document
    const deal = await Deal.findById(id);

    if (!deal) {
      return NextResponse.json(
        { success: false, error: 'Deal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deal: {
        id: deal._id.toString(),
        companyName: deal.companyName,
        companyNumber: deal.companyNumber,
        businessTurnover: deal.businessTurnover,
        fundingType: deal.fundingType,
        purpose: deal.purpose,
        loanAmount: deal.loanAmount,
        notes: deal.notes,
        createdAt: deal.createdAt
      }
    });

  } catch (error) {
    console.error('Get deal error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deal' },
      { status: 500 }
    );
  }
}