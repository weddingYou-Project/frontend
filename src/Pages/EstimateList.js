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
  let [dataCount, setDataCount] = useState();
  let [getdata, setData] = useState([]);
  let [start, setStart] = useState(0);
  let [search, setSearch] = useState("");
  let [slicenum, setSlicenum] = useState(7);
  let [withcomplete, setWithCompletelist] = useState(false);
  let [sort, setSort] = useState("최신순▼");

  useEffect(() => {
    axios
      .get("http://localhost:8080/estimate/getlist")
      .then((res) => {
        let { data } = res;
        setData(data);
        setSlicenum(7);
        setDataCount(data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight) {
      setSlicenum((prevdata) => prevdata + 7);
    }
  };

  //검색어
  const enterSearch = (e) => {
    console.log(search);
    setSearch(e.target.value);
  };

  const searchResult = () => {
    axios
      .get("http://localhost:8080/estimate/getsearchlist", {
        params: { search: search },
      })
      .then((res) => {
        let { data } = res;
        setWithCompletelist(false);
        setSlicenum(7);
        setDataCount(data.length);
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onCompleteHandler = () => {
    if (withcomplete === false) {
      setWithCompletelist(true);
      setSlicenum(7);
    } else {
      setWithCompletelist(false);
      setSlicenum(7);
    }
  };

  const onScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const withoutcomplete = getdata.filter((e) => e.matchstatus === withcomplete);
  const dataArraywithoutComplete = withoutcomplete.slice(0, slicenum);
  const dataArraywithComplete = getdata.slice(0, slicenum);

  return (
    <div className="mainlayout">
      <NavigationBar title={"견적서 목록"} />
      <div
        className={styles.맨위로가는버튼}
        onClick={() => {
          onScrollTop();
        }}
      >
        <i class="bi bi-chevron-up"></i>
      </div>
      <div className={styles.작성버튼}>
        <i class="bi bi-pencil-square"></i>
        <div
          className={styles.작성버튼자식}
          onClick={() => {
            navigate("/estimateform");
          }}
        >
          <span>견적작성하기</span>
        </div>
      </div>
      <div className={styles.EstimateListContainer}>
        <div className={styles.EstimateListSearchbarBox}>
          <input
            className="form-control"
            placeholder="검색어를 입력해주세요"
            type="text"
            onChange={enterSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.code === "Enter") {
                searchResult();
              }
            }}
          />
          <div className={styles.EstimateListSearchIcon}>
            <i class="bi bi-search"></i>
          </div>
        </div>
        <div className={styles.EstimateListDataCountAndSortBox}>
          <div className={styles.EstimateListDataCount}>
            &nbsp;{dataCount}개의 검색결과
          </div>
          <div className={styles.EstimateListSort}>
            <span
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              {sort}
            </span>
          </div>
        </div>
        <div className={styles.EstimateListMatchCompleteButton}>
          <p>
            {/* &nbsp;<i class="bi bi-check-circle"></i> 매칭완료된 견적서 보기 */}
            <input
              type="checkbox"
              id="check"
              checked={withcomplete === true}
              onClick={onCompleteHandler}
            />
            <label htmlFor="check" style={{ cursor: "pointer" }}>
              &nbsp;&nbsp;매칭완료된 견적서 같이보기
            </label>
          </p>
        </div>
        <div className={styles.EstimateListDataBox}>
          {withcomplete === false ? (
            <DataListComp list={dataArraywithoutComplete} />
          ) : (
            <DataListComp list={dataArraywithComplete} />
          )}
        </div>
        <div style={{ height: 200 }}></div>
      </div>
      {/*컨테이너 */}
      <Footer />
      <SortModal />
    </div>
  );
};

export default EstimateList;

const DataListComp = ({ list }) => {
  return (
    <>
      {list.map((e, index) => {
        return (
          <div className={styles.EstimateListData} key={index}>
            {e.matchstatus === true ? (
              <div className={styles.EstimateListComplete}>매칭완료</div>
            ) : (
              ""
            )}
            <div className={styles.EstimateListDataTitle}>{e.title}</div>
            <div className={styles.EstimateListDataRegion}>
              희망지역 :{" "}
              {JSON.parse(e.region).map((e, index) => {
                return <span>{e}&nbsp;&nbsp;</span>;
              })}
            </div>
            <div className={styles.EstimateListDataBudget}>
              희망 예산 : {e.budget}원
            </div>
            <div className={styles.EstimateListDataViewCountAndDate}>
              <div className={styles.ViewCountAndDate}>
                조회수 : {e.viewcount}{" "}
              </div>
              <div className={styles.ViewCountAndDate}>작성일 : {e.date}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const SortModal = () => {
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              정렬
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>높은가격순</p>
            <p>낮은가격순</p>
            <p>드레스</p>
            <p>스튜디오</p>
            <p>지역</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
