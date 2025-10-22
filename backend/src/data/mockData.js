export const users = [{
    id: 'user-operator-1',
    type: 'user',
    name: 'Alice Operator',
    email: 'alice@example.com',
    role: 'operator',
    avatar: 'https://i.pravatar.cc/150?img=1'
},
{
    id: 'user-partner-1',
    type: 'user',
    name: 'Bob Partner',
    email: 'bob@example.com',
    role: 'partner',
    avatar: 'https://i.pravatar.cc/150?img=2',
},
{
    id: 'user-approver-1',
    type: 'user',
    name: 'Carol Approver',
    email: 'carol@example.com',
    role: 'approver',
    avatar: 'https://i.pravatar.cc/150?img=3',
}, {
    id: 'user-admin-1',
    type: 'user',
    name: 'John Administrator',
    email: 'john@example.com',
    role: 'administrator'
}];

export const tickets = [{
    id: "Ticket_001",
    type: "ticket",
    photoIds: ["15377489_5081878_001", "15377489_5081878_002", "15377489_5081878_007", "Block Libre"],
    folder: "Ticket1",
    note: "Please be aware to keep clipping path for all pictures (but only 1 clipping path)\n",
    guide: `Can you please make
    15377489_001+002 +007 please make pantone color: Granita -solid
    15377489_001+002 +007 please make pantone color: Fuchsia Fedora,
    AOP Block Libre (as attached: Block Libre)`,
    priority: "medium",
    partnerId: "user-partner-1",
    status: "Draft"
},
{
    id: "Ticket_002",
    type: "ticket",
    photoIds: ["15377486_5078866_001", "15377486_5078866_002", "15377486_5078866_007", "DOTS CLOUD DANCER"],
    folder: "Ticket2",
    note: "Please be aware to keep clipping path for all pictures (but only 1 clipping path)",
    guide: `Can you please make
    15377486_001+002 +007 please make pantone color: Night Sky,
    AOP White Dots (as attached: DOTS CLOUD DANCER -but night sky, not black)
    15377486_001+002 +007 please make pantone color: Hedge Green -solid
    15377486_001+002 +007 please make pantone color: Navy Blazer-solid`,
    priority: "medium",
    partnerId: "user-partner-1",
    status: "Draft"
},
{
    id: "Ticket_003",
    type: "ticket",
    photoIds: ["15377488_5078869_001", "15377488_5078869_002", "15377488_5078869_007", "DOTS CLOUD DANCER"],
    folder: "Ticket3",
    note: "Please be aware to keep clipping path for all pictures (but only 1 clipping path)",
    guide: `Can you please make
    15377488_001+002 +007 please make pantone color: Hedge Green -solid
    15377488_001+002 +007 please make pantone color: Navy Blazer-solid
    15377488_001+002 +007 please make pantone color: Night Sky,
    AOP White Dots (as attached: DOTS CLOUD DANCER -but night sky, not black)`,
    priority: "medium",
    partnerId: "user-partner-1",
    status: "Draft"
},
{
    id: "Ticket_004",
    type: "ticket",
    photoIds: ["15377522_5081887_001", "15377522_5081887_002", "15377522_5081887_007", "Block Libre"],
    folder: "Ticket4",
    note: "Please be aware to keep clipping path for all pictures (but only 1 clipping path)",
    guide: `Can you please make
    15377522_001+002 +007 please make pantone color: Granita -solid
    15377522_001+002 +007 please make pantone color: Fuchsia Fedora,
    as attached: Block Libre)`,
    priority: "medium",
    partnerId: "user-partner-1",
    status: "Draft"
}];
