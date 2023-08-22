import mongoose from 'mongoose';
import { OrderStatus } from '@ticketingapporg/common';
import { TicketDoc } from './Ticket';

export { OrderStatus };

interface OrderAttrs {
  status: OrderStatus;
  ticket: TicketDoc;
  userId: string;
  expiresAt: Date;
}

interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  ticket: TicketDoc;
  userId: string;
  expiresAt: Date;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },
    userId: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };