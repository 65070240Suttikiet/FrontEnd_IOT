import { useParams } from "react-router-dom";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import Layout from "../components/layout";
import { Container, Alert, Divider, Button } from "@mantine/core";
import { Order } from "../lib/models";
import { Link } from "react-router-dom";

export default function OrderByIdPage() {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useSWR<Order>(`/order/${orderId}`);

  return (
    <Layout>
      <Container className="mt-4">
        {isLoading && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}

        {!!order && (
          <div className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto p-4 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <p className="italic text-neutral-500 mb-4">
            Order Date: {new Date(order.order_date).toLocaleDateString()}
          </p>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="px-4 space-y-2 py-4 w-full max-w-md text-center">
              {/* <h3 className="text-xl font-semibold mb-2">Order Information</h3> */}
              <p><strong>Coffee ID:</strong> {order.coffee_id}</p>
              <p><strong>Amount:</strong> {order.amount}</p>
              <p><strong>Total Price:</strong> {order.total_price} บาท</p>
              <p><strong>Notes:</strong> {order.notes}</p>
            </div>
          </div>
          <Divider className="mt-4 w-full max-w-md" />
          <Button
            component={Link}
            to="/menu"
            size="xs"
            variant="primary"
            className="flex items-center space-x-2 bg-red-600 mt-4"
          >
            Back
          </Button>
        </div>
        
        )}
      </Container>
    </Layout>
  );
}

