import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";
import Tiger from "../assets/images/tiger.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things และนายกฤตณัฏฐ์
            ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ FastAPI และ React ในวิชานี้
          </p>

          <div>
            <img src={ajPanwitImage} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>
        <p className="text-left mt-8">
          ปัจจุบันคาเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ <b>นายสุทธิเกียรติ หัทยาสมบูรณ์ 65070240 </b> ซึ่งเป็นลูกศิษย์ของอาจารย์ปานวิทย์ 
          {/* TODO: ชื่อของตนเอง, รหัสประจำตัวนักศึกษา และแนะนำคาเฟ่นี้ต่ออีกสักหน่อย + ใส่รูปของตนเอง (ไม่จำเป็นหากไม่สะดวกใจใส่รูป) */}
          <br></br>ซึ่งมีบริการ  กาแฟ ชา นม ในราคาย่อมเยาว์ และมีหนังสือให้เลือกอ่านมากมาย ภายใต้บรรยากาศที่สบายๆ และเงียบสงบ ที่เหมาะสำหรับการทำงานหรืออ่านหนังสือ<br></br>
          อีกทั้งยังมีบริการอินเทอร์เน็ตฟรี สำหรับลูกค้าที่ต้องการใช้บริการอินเทอร์เน็ต เพียงเต้นเพลงยายแล่มอีตอนสาวๆ ให้ผู้ดูแลสุดหล่อดู รับรหัส wifi ไปเลย ยังไม่หมด!!! <br></br> 
          คาเฟ่เรายังมีโซนถ่ายรูปไว้ลงโซเชียลสวยๆอวดเพื่อนอวดพี่อวดน้องอวดลุงป้าน้าอาอีกด้วยอีกด้วย แล้วแวะมาใช้บริการร้านคาเฟ่หนังสือของเรากันเยอะๆนะครับบบบบ

        </p>
      </section>
      <section className="w-4/12 flex justify-center items-center mx-20">
         <img src={Tiger} alt="Tiger" className="w-full" />
      </section>
      <section className="w-full my-10 h-screen flex justify-center " >
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
