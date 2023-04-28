import "../Css/main.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

function Mypage() {
  const title = "마이페이지";
  return (
    <div class="mainlayout">
      <NavigationBar title={title} />
      <div class="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum nihil,
        cumque neque rerum nostrum fuga molestiae voluptatem laudantium! Illo
        veritatis placeat eligendi reiciendis recusandae minima enim nulla
        facere temporibus autem? Architecto dolorem harum voluptatem, dolores !
        Fuga possimus similique amet rerum rem delectus, ipsa esse nam saepe
        maiores ipsam blanditiis impedit porro obcaecati sunt sed aspernatur in
        asperiores facere, aliquam consequatur provident cupiditate. Modi, enim
        quos. Quis nihil aspernatur eveniet minima beatae quibusdam, quaerat
        sequi doloremque labore, praesentium consectetur assumenda laboriosam
        nostrum animi necessitatibus iusto aliquam tenetur. Quod a porro
        doloremque pariatur magni repellat dicta aperiam! Sapiente at eligendi
        quasi aut explicabo culpa maiores iste ipsam impedit architecto
        exercitationem, suscipit, nesciunt deserunt illo, cumque ullam? Alias
        perferendis qui dolorem libero saepe soluta nulla assumenda blanditiis
        nam!
      </div>
      <Footer />
    </div>
  );
}

export default Mypage;
