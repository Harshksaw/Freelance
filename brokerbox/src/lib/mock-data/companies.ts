export interface MockCompany {
    company_number: string;
    title: string;
    company_status: 'active' | 'dissolved' | 'liquidation';
    date_of_creation: string;
    company_type: string;
    address_snippet: string;
    description?: string;
  }
  
  export const mockCompanies: MockCompany[] = [
    {
      company_number: "12345678",
      title: "ACME TRADING LIMITED",
      company_status: "active",
      date_of_creation: "2020-01-15",
      company_type: "ltd",
      address_snippet: "123 Business Street, London, EC1A 1BB",
      description: "Wholesale trade in food, beverages and tobacco"
    },
    {
      company_number: "87654321",
      title: "TECH SOLUTIONS LTD",
      company_status: "active", 
      date_of_creation: "2019-06-10",
      company_type: "ltd",
      address_snippet: "456 Innovation Ave, Manchester, M1 2AB",
      description: "Computer programming activities"
    },
    {
      company_number: "11223344",
      title: "BUILDERS MERCHANT LIMITED",
      company_status: "active",
      date_of_creation: "2018-03-22",
      company_type: "ltd", 
      address_snippet: "789 Construction Road, Birmingham, B1 3CD",
      description: "Wholesale of wood, construction materials and sanitary equipment"
    },
    {
      company_number: "44332211",
      title: "DIGITAL MARKETING EXPERTS LTD",
      company_status: "active",
      date_of_creation: "2021-09-05",
      company_type: "ltd",
      address_snippet: "321 Marketing Square, Leeds, LS1 4EF",
      description: "Advertising agencies"
    },
    {
      company_number: "55667788",
      title: "GREEN ENERGY SOLUTIONS LIMITED",
      company_status: "active",
      date_of_creation: "2020-11-30",
      company_type: "ltd",
      address_snippet: "654 Renewable Way, Bristol, BS1 5GH",
      description: "Electric power generation"
    },
    {
      company_number: "99887766",
      title: "RESTAURANT GROUP PLC",
      company_status: "active",
      date_of_creation: "2017-02-14",
      company_type: "plc",
      address_snippet: "987 Food Court, Liverpool, L1 6IJ",
      description: "Licensed restaurants"
    },
    {
      company_number: "13579246",
      title: "LOGISTICS TRANSPORT LIMITED",
      company_status: "active",
      date_of_creation: "2019-08-18",
      company_type: "ltd",
      address_snippet: "147 Transport Hub, Newcastle, NE1 7KL",
      description: "Freight transport by road"
    },
    {
      company_number: "24681357",
      title: "FASHION RETAIL GROUP LTD",
      company_status: "active",
      date_of_creation: "2018-12-03",
      company_type: "ltd",
      address_snippet: "258 High Street, Edinburgh, EH1 8MN",
      description: "Retail sale of clothing in specialised stores"
    },
    {
      company_number: "36925814",
      title: "MANUFACTURING SOLUTIONS LIMITED",
      company_status: "active",
      date_of_creation: "2016-05-20",
      company_type: "ltd",
      address_snippet: "369 Industrial Estate, Sheffield, S1 9OP",
      description: "Manufacture of machinery for food, beverage and tobacco processing"
    },
    {
      company_number: "75319864",
      title: "FINANCIAL ADVISORS LTD",
      company_status: "active",
      date_of_creation: "2020-07-12",
      company_type: "ltd",
      address_snippet: "753 Money Street, Glasgow, G1 0QR",
      description: "Financial intermediation activities"
    },
    {
      company_number: "15975348",
      title: "PROPERTY DEVELOPMENT GROUP LIMITED",
      company_status: "active",
      date_of_creation: "2017-10-08",
      company_type: "ltd",
      address_snippet: "159 Development Road, Cardiff, CF1 1ST",
      description: "Development of building projects"
    },
    {
      company_number: "95175342",
      title: "HEALTHCARE SERVICES LTD",
      company_status: "active",
      date_of_creation: "2021-01-25",
      company_type: "ltd",
      address_snippet: "951 Medical Centre, Belfast, BT1 2UV",
      description: "Human health activities"
    },
    {
      company_number: "84273951",
      title: "AUTOMOTIVE PARTS LIMITED",
      company_status: "active",
      date_of_creation: "2018-09-17",
      company_type: "ltd",
      address_snippet: "842 Motor Trade Park, Coventry, CV1 3WX",
      description: "Wholesale of motor vehicle parts and accessories"
    },
    {
      company_number: "62849173",
      title: "EDUCATION SERVICES GROUP LTD",
      company_status: "active",
      date_of_creation: "2019-04-11",
      company_type: "ltd",
      address_snippet: "628 Learning Lane, Oxford, OX1 4YZ",
      description: "Educational support services"
    },
    {
      company_number: "39481726",
      title: "SECURITY SOLUTIONS LIMITED",
      company_status: "active",
      date_of_creation: "2020-06-29",
      company_type: "ltd",
      address_snippet: "394 Safety Street, Plymouth, PL1 5AB",
      description: "Security and investigation activities"
    },
    {
      company_number: "17283946",
      title: "CATERING SERVICES LTD",
      company_status: "active",
      date_of_creation: "2018-11-14",
      company_type: "ltd",
      address_snippet: "172 Kitchen Road, Southampton, SO1 6CD",
      description: "Event catering activities"
    },
    {
      company_number: "73619428",
      title: "ENGINEERING CONSULTANCY LIMITED",
      company_status: "active",
      date_of_creation: "2017-08-07",
      company_type: "ltd",
      address_snippet: "736 Technical Way, Cambridge, CB1 7EF",
      description: "Engineering related scientific and technical consulting activities"
    },
    {
      company_number: "58294617",
      title: "MEDIA PRODUCTION GROUP LTD",
      company_status: "active",
      date_of_creation: "2019-12-19",
      company_type: "ltd",
      address_snippet: "582 Creative Quarter, Brighton, BN1 8GH",
      description: "Motion picture, video and television programme production activities"
    },
    {
      company_number: "46182739",
      title: "CLEANING SERVICES LIMITED",
      company_status: "active",
      date_of_creation: "2020-03-16",
      company_type: "ltd",
      address_snippet: "461 Service Road, Nottingham, NG1 9IJ",
      description: "General cleaning of buildings"
    },
    {
      company_number: "91537284",
      title: "TELECOMMUNICATIONS LTD",
      company_status: "active",
      date_of_creation: "2021-05-23",
      company_type: "ltd",
      address_snippet: "915 Communication Street, Derby, DE1 0KL",
      description: "Wireless telecommunications activities"
    },
    // Add more companies for better search testing...
    {
      company_number: "28374619",
      title: "SMITH ENTERPRISES LIMITED",
      company_status: "active",
      date_of_creation: "2019-02-28",
      company_type: "ltd",
      address_snippet: "283 Enterprise Park, Stoke-on-Trent, ST1 1MN",
      description: "Other business support service activities"
    },
    {
      company_number: "64827153",
      title: "JOHNSON TRADING LTD",
      company_status: "active",
      date_of_creation: "2018-07-09",
      company_type: "ltd",
      address_snippet: "648 Trade Centre, Hull, HU1 2OP",
      description: "Wholesale trade activities"
    },
    {
      company_number: "19384756",
      title: "BROWN CONSTRUCTION LIMITED",
      company_status: "active",
      date_of_creation: "2017-11-21",
      company_type: "ltd",
      address_snippet: "193 Building Site, Preston, PR1 3QR",
      description: "Construction of commercial buildings"
    },
    {
      company_number: "85297431",
      title: "WILLIAMS RETAIL GROUP LTD",
      company_status: "active",
      date_of_creation: "2020-09-14",
      company_type: "ltd",
      address_snippet: "852 Shopping District, York, YO1 4ST",
      description: "Retail sale via stalls and markets"
    },
    {
      company_number: "37164829",
      title: "DAVIS LOGISTICS LIMITED",
      company_status: "active",
      date_of_creation: "2019-01-07",
      company_type: "ltd",
      address_snippet: "371 Distribution Way, Middlesbrough, TS1 5UV",
      description: "Warehousing and storage"
    },
    {
      company_number: "52841967",
      title: "MILLER TECHNOLOGY LTD",
      company_status: "active",
      date_of_creation: "2021-03-18",
      company_type: "ltd",
      address_snippet: "528 Tech Park, Reading, RG1 6WX",
      description: "Computer consultancy activities"
    },
    {
      company_number: "74639518",
      title: "WILSON MANUFACTURING LIMITED",
      company_status: "active",
      date_of_creation: "2018-04-26",
      company_type: "ltd",
      address_snippet: "746 Factory Road, Blackpool, FY1 7YZ",
      description: "Manufacture of other general-purpose machinery"
    },
    {
      company_number: "96152837",
      title: "MOORE SERVICES GROUP LTD",
      company_status: "active",
      date_of_creation: "2020-08-02",
      company_type: "ltd",
      address_snippet: "961 Professional Plaza, Bournemouth, BH1 8AB",
      description: "Other professional, scientific and technical activities"
    },
    {
      company_number: "41827396",
      title: "TAYLOR HOSPITALITY LIMITED",
      company_status: "active",
      date_of_creation: "2017-06-15",
      company_type: "ltd",
      address_snippet: "418 Hotel Street, Canterbury, CT1 9CD",
      description: "Hotels and similar accommodation"
    },
    {
      company_number: "63748291",
      title: "ANDERSON FINANCE LTD",
      company_status: "active",
      date_of_creation: "2019-10-04",
      company_type: "ltd",
      address_snippet: "637 Financial Quarter, Exeter, EX1 0EF",
      description: "Other credit granting"
    }
  ];
  

  export function searchCompanies(query: string, limit: number = 10): MockCompany[] {
    if (!query || query.length < 2) {
      return [];
    }
  
    const searchTerm = query.toLowerCase().trim();
    

    const filtered = mockCompanies.filter(company => {
      const titleMatch = company.title.toLowerCase().includes(searchTerm);
      const numberMatch = company.company_number.includes(searchTerm);
      const descriptionMatch = company.description?.toLowerCase().includes(searchTerm) || false;
      
      return titleMatch || numberMatch || descriptionMatch;
    });
  

    const sorted = filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      
      // Exact match at start gets highest priority
      if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm)) return -1;
      if (!aTitle.startsWith(searchTerm) && bTitle.startsWith(searchTerm)) return 1;
      

      return aTitle.localeCompare(bTitle);
    });
  
    return sorted.slice(0, limit);
  }