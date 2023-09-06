import { Ticket } from "../Ticket";

it("implements optimistic concurrency control", async () => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: "123",
    });

    // Save the ticket to the database
    ticket.save();

    // Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id).exec();
    const secondInstance = await Ticket.findById(ticket.id).exec();

    // Make two separate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    // Save the first fetched ticket
    await firstInstance!.save();

    // Expect an error to be thrown
    try {
        await secondInstance!.save();
    } catch (error) {
       return;
    }

    throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20,
        userId: '123'
    });
    await ticket.save();

    expect(ticket.version).toEqual(0);

    ticket.set({ price: 10 });
    await ticket.save();

    expect(ticket.version).toEqual(1);

    ticket.set({ price: 20 });
    await ticket.save();

    expect(ticket.version).toEqual(2);
});
