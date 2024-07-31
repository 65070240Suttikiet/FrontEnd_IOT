import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import {  useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { Coffee, Order } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";


export default function OrderPage() {
  const { ordersID } = useParams();
  const { data: orders, error: ordersError } = useSWR<Order[]>(`/order/`);
  useSWR<Order>(`/order/${ordersID}`);
  const { data: coffees, error: coffeesError } = useSWR<Coffee[]>("/coffee/");
  const [, setIsProcessing] = useState(false);
 

  // เพิ่ม orderID ในฟังก์ชัน handleDelete
  const handleDelete = async (orderId: string) => {
    try {
      setIsProcessing(true);
      await axios.delete(`/order/${orderId}`);
      notifications.show({
        title: "ลบคำสั่งซื้อสำเร็จ",
        message: "คำสั่งซื้อถูกลบออกจากระบบเรียบร้อยแล้ว",
        color: "red",
      });
      mutate('/order/');
      // navigate("/order");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบคำสั่งซื้อ",
            message: "ไม่พบคำสั่งซื้อที่ต้องการลบ",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์",
            message: "กรุณาลองอีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองอีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <section
        className="h-[350px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">Order</h1>
        <h2>รายการเครื่องออเดอร์ทั้งหมด</h2>
      </section>

      <section className="container mx-auto py-8">
        <div className="flex justify-between pb-8">
          <h1 className="flex justify-between ">รายการสั่งซื้อทั้งหมด</h1>
        </div>

        {/* Loading States */}
        {!orders && !ordersError && !coffees && !coffeesError && <Loading />}

        {/* Error Handling */}
        {(ordersError || coffeesError) && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {ordersError?.message || coffeesError?.message}
          </Alert>
        )}

        {/* Empty Data State */}
        {orders && coffees && orders.length === 0 && coffees.length === 0 && (
          <p className="text-center">No orders or coffees available</p>
        )}

        {/* Orders Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {orders?.map((order) => {
            const coffee = coffees?.find(coffee => coffee.id === order.coffee_id);
            return (
              <div key={order.id} className="border border-solid border-neutral-200 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://placehold.co/400x300?text=${encodeURIComponent(coffee?.name || 'Coffee')}`}
                  alt={`Order ${coffee?.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{coffee?.name || 'Unknown Coffee'}</h2>
                  <p className="text-neutral-500 mb-2">Order ID : {order.id}</p>
                  <p className="text-neutral-500 mb-2">Amount : {order.amount || 0}</p>
                  <p className="text-neutral-500 mb-2">
                    Order Date: {order.order_date ? new Date(order.order_date).toLocaleString() : 'N/A'}
                  </p>
                  <p className="text-neutral-500 mb-2">{order.notes || 'No notes'}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">{order.total_price || 0} Baht</div>
                    <Button
                      color="red"
                      leftSection={<IconTrash />}
                      size="xs"
                      onClick={() => {
                        modals.openConfirmModal({
                          title: "คุณต้องการลบคำสั่งซื้อนี้ใช่หรือไม่",
                          children: (
                            <span className="text-xs">
                              เมื่อคุณดำเนินการลบคำสั่งซื้อแล้ว จะไม่สามารถย้อนกลับได้
                            </span>
                          ),
                          labels: { confirm: "ลบ", cancel: "ยกเลิก" },
                          onConfirm: () => {
                            handleDelete(order.id.toString());
                          },
                          confirmProps: {
                            color: "red",
                          },
                        });
                      }}
                    >
                      ลบออเดอร์นี้
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}


