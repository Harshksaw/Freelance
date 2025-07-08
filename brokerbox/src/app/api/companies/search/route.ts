import { NextRequest, NextResponse } from 'next/server';
import { searchCompanies } from '../../../../lib/mock-data/companies';

export async function GET(request: NextRequest) {
  try {
    // Get search query from URL parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');
    
    // Validate query
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    if (query.length < 2) {
      return NextResponse.json({
        items: [],
        total_results: 0,
        kind: "search#companies"
      });
    }

    // Parse limit (default to 10, max 20)
    const limit = Math.min(parseInt(limitParam || '10'), 20);

    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

    // Search companies
    const results = searchCompanies(query, limit);

    // Format response like real Companies House API
    const response = {
      kind: "search#companies",
      etag: `"${Date.now()}"`,
      total_results: results.length,
      items: results.map(company => ({
        company_number: company.company_number,
        title: company.title,
        company_status: company.company_status,
        date_of_creation: company.date_of_creation,
        company_type: company.company_type,
        address_snippet: company.address_snippet,
        description: company.description,
        matches: {
          title: [1, company.title.length]
        },
        links: {
          self: `/company/${company.company_number}`
        }
      }))
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Company search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}