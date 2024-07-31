import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import Layout from "../components/layout";
import { Button, Container, Divider, Alert, Badge, TextInput, NumberInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Coffee, Order } from "../lib/models";
import { useState, useEffect } from "react";

export default function MenuByIdPage() {
  const { coffeeId } = useParams();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const { data: coffee, isLoading, error } = useSWR<Coffee>(`/coffee/${coffeeId}`);
 
  const orderCreateForm = useForm({
    initialValues: {
      coffee_id: coffeeId || "",
      total_price: 0,
      amount: 1,
      notes: "",
      order_date: "",
    },

    validate: {
      coffee_id: isNotEmpty("กรุณาระบุชื่อเครื่องดื่ม"),
      total_price: isNotEmpty("กรุณาระบุราคารวม"),
      amount: isNotEmpty("กรุณาระบุจำนวน"),
    },
  });

  useEffect(() => {
    if (coffee) {
      const amount = orderCreateForm.values.amount;
      orderCreateForm.setFieldValue('total_price', amount * coffee.price);
    }
  }, [orderCreateForm.values.amount, coffee]);

  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    try {
      setIsProcessing(true);
      const orderValues = {
        ...values,
        order_date: new Date().toISOString(),
      };
      const response = await axios.post<Order>(`/order`, orderValues);
      notifications.show({
        title: "เพิ่มข้อมูลเครื่องดื่มสำเร็จ",
        message: "ข้อมูลเครื่องดื่มได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/orders/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Layout>
      <Container className="mt-4 px-4 md:px-8">
        {isLoading && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
            className="mb-4"
          >
            {error.message}
          </Alert>
        )}
  
        {!!coffee && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{coffee.name}</h1>
            <p className="italic text-gray-600 mb-4 text-lg">ราคา: {coffee.price} บาท</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <img
                src={`https://placehold.co/150x200?text=${encodeURIComponent(coffee.name)}`}
                alt={coffee.name}
                className="w-full object-cover aspect-[3/4] rounded-md shadow-md"
              />
              <div className="col-span-2 px-4 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">รายละเอียด</h3>
                <p className="text-gray-700">{coffee.des}</p>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">ส่วนผสมของนม</h3>
                    <Badge color={coffee.available ? "green" : "gray"}>
                      {coffee.available ? "มีส่วนผสมของนม" : "ไม่มีส่วนผสมของนม"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">ราคา</h3>
                    <Badge color="blue">
                      {coffee.price} บาท
                    </Badge>
                  </div>
                </div>
                <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="space-y-6">
                  <NumberInput
                    label="จำนวน"
                    placeholder="จำนวน"
                    min={1}
                    {...orderCreateForm.getInputProps("amount")}
                    className="mb-4"
                  />
                  <NumberInput
                    label="ราคารวม"
                    placeholder="ราคารวม"
                    min={0}
                    value={orderCreateForm.values.total_price}
                    readOnly
                    {...orderCreateForm.getInputProps("total_price")}
                    className="mb-4"
                  />
                  <TextInput
                    label="เพิ่มเติม"
                    placeholder="เพิ่มเติม"
                    {...orderCreateForm.getInputProps("notes")}
                    className="mb-4"
                  />
                  <Divider className="my-4" />
                  <Button type="submit" loading={isProcessing} className="w-full">
                    บันทึกข้อมูล
                  </Button>
                </form>
              </div>
            </div>
            <Divider className="mt-4" />
          </>
        )}
      </Container>
    </Layout>
  );
}  
