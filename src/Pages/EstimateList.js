//리액트 임포트
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//스타일 중복을 피하기 위한 종속
import styles from "../Css/EstimateList.module.css";

//컴포넌트 임포트
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer.js";

//내용물세팅 width :80% margin : 0 auto를 이용한 중앙 정렬 margin-top : 100px, /맨위 패딩 20px 0px 마진 탑 8px=검색창이 될듯

const EstimateList = () => {
  let [dataCount, setDataCount] = useState(120);
  let [dummy, setDummy] = useState([1, 1, 1, 1, 1, 1]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/estimate/getlist")
      .then((res) => {
        let { data } = res;
        console.log(data.length);
        setDataCount(data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="mainlayout">
      <NavigationBar title={"견적서 목록"} />
      {/* <div className={styles.작성버튼}>
        <i class="bi bi-pencil-square"></i>
        <div
          className={styles.작성버튼자식}
          onClick={() => {
            navigate("/estimateform");
          }}
        >
          <p>견적작성하기</p>
        </div>
      </div> */}
      <div className={styles.EstimateListContainer}>
        <div className={styles.EstimateListSearchbarBox}>
          <input
            className="form-control"
            placeholder="검색어를 입력해주세요"
            type="text"
          />
          <div className={styles.EstimateListSearchIcon}>
            <i class="bi bi-search"></i>
          </div>
        </div>
        <div className={styles.EstimateListDataCountAndSortBox}>
          <div className={styles.EstimateListDataCount}>
            &nbsp;{dataCount}개의 검색결과
          </div>
          <div className={styles.EstimateListSort}>최신순▼</div>
        </div>
        <div className={styles.EstimateListMatchCompleteButton}>
          <p>
            &nbsp;<i class="bi bi-check-circle"></i> 매칭완료된 견적서 보기
          </p>
        </div>
        <div className={styles.EstimateListDataBox}>
          {dummy.map((e, index) => {
            return (
              <div className={styles.EstimateListData}>
                {/*이미지 */}

                {/*이미지 */}
                <div className={styles.EstimateListDataTitle}></div>
                <div className={styles.EstimateListDataRegion}></div>
                <div className={styles.EstimateListDataBudget}></div>
              </div>
            );
          })}
        </div>
        <div style={{ height: 200 }}></div>
      </div>
      {/*컨테이너 */}
      <Footer />
    </div>
  );
};

export default EstimateList;

{
  /* <div className={styles.EstimateListSearchbar}>
            <div className={styles.EstimateListSearchIcon}>
              <i class="bi bi-search"></i>
            </div>
            <input type="text" placeholder="검색어를 입력해주세요" />
          </div> */
}
