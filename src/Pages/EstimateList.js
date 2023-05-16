//리액트 임포트
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//스타일 중복을 피하기 위한 종속
import styles from "../Css/EstimateList.css";

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
  let [sort, setSort] = useState("최신순");
  let [close, setClose] = useState("none");
  let [dressfilterstyle, setDressfilterstyle] = useState(0);
  let [makeupfilterstyle, setmakeupfilterstyle] = useState(0);
  let [studiofilterstyle, setstudiofilterstyle] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/estimate/getlist")
      .then((res) => {
        let { data } = res;
        setData(data);
        setSlicenum(7);
        setDataCount(data.filter((e) => e.matchstatus === false).length);
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
        setSort("최신순");
        setDataCount(data.filter((e) => e.matchstatus === false).length);
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

  const SortSelector = () => {
    if (sort === "최신순") {
      return getdata;
    }
    if (sort === "높은가격순") {
      let sortresult = getdata.sort((a, b) => b.budget - a.budget);
      return sortresult;
    }
    if (sort === "낮은가격순") {
      let sortresult = getdata.sort((a, b) => a.budget - b.budget);
      return sortresult;
    }
    if (sort === "높은조회수순") {
      let sortresult = getdata.sort((a, b) => b.viewcount - a.viewcount);
      return sortresult;
    }
    if (sort === "드레스(머메이드)") {
      let sortresult = getdata.filter((e) => e.dress.includes("머메이드"));
      return sortresult;
    }
    if (sort === "드레스(벨라인)") {
      let sortresult = getdata.filter((e) => e.dress.includes("벨라인"));
      return sortresult;
    }
    if (sort === "드레스(H라인)") {
      let sortresult = getdata.filter((e) => e.dress.includes("H라인"));
      return sortresult;
    }
    if (sort === "드레스(프린세스)") {
      let sortresult = getdata.filter((e) => e.dress.includes("프린세스"));
      return sortresult;
    }
    if (sort === "드레스(엠파이어)") {
      let sortresult = getdata.filter((e) => e.dress.includes("엠파이어"));
      return sortresult;
    }
    if (sort === "드레스(A라인)") {
      let sortresult = getdata.filter((e) => e.dress.includes("A라인"));
      return sortresult;
    }
    if (sort === "메이크업(로맨틱)") {
      let sortresult = getdata.filter((e) => e.makeup.includes("로맨틱"));
      return sortresult;
    }
    if (sort === "메이크업(포인트)") {
      let sortresult = getdata.filter((e) => e.makeup.includes("포인트"));
      return sortresult;
    }
    if (sort === "메이크업(내추럴)") {
      let sortresult = getdata.filter((e) => e.makeup.includes("내추럴"));
      return sortresult;
    }
    if (sort === "메이크업(스모키)") {
      let sortresult = getdata.filter((e) => e.makeup.includes("스모키"));
      return sortresult;
    }
    if (sort === "메이크업(큐티)") {
      let sortresult = getdata.filter((e) => e.makeup.includes("큐티"));
      return sortresult;
    }
    if (sort === "메이크업(러블리)") {
      let sortresult = getdata.filter((e) => e.makeup.includes("러블리"));
      return sortresult;
    }
    if (sort === "스튜디오(인물중심)") {
      let sortresult = getdata.filter((e) => e.studio.includes("인물중심"));
      return sortresult;
    }
    if (sort === "스튜디오(배경중심)") {
      let sortresult = getdata.filter((e) => e.studio.includes("배경중심"));
      return sortresult;
    }
    if (sort === "스튜디오(균형적인)") {
      let sortresult = getdata.filter((e) => e.studio.includes("균형적인"));
      return sortresult;
    }
  };

  useEffect(() => {
    if (withcomplete === false) setDataCount(withoutcomplete.length);
    else setDataCount(SortSelector().length);
  }, [sort, withcomplete]);

  const navigate = useNavigate();
  const withoutcomplete = SortSelector().filter(
    (e) => e.matchstatus === withcomplete
  );
  const dataArraywithoutComplete = withoutcomplete.slice(0, slicenum);
  const dataArraywithComplete = SortSelector().slice(0, slicenum);

  const modalControl = () => {
    setClose("none");
    setDressfilterstyle(0);
    setmakeupfilterstyle(0);
    setstudiofilterstyle(0);
  };

  return (
    <div className="mainlayout">
      <NavigationBar title={"견적서 목록"} />
      <div
        className="맨위로가는버튼"
        onClick={() => {
          onScrollTop();
        }}
      >
        <i class="bi bi-chevron-up"></i>
      </div>
      <div className="작성버튼">
        <i class="bi bi-pencil-square"></i>
        <div
          className="작성버튼자식"
          onClick={() => {
            navigate("/estimateform");
          }}
        >
          <span>견적작성하기</span>
        </div>
      </div>
      <div className="EstimateListContainer">
        <div className="EstimateListSearchbarBox">
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
          <div className="EstimateListSearchIcon">
            <i class="bi bi-search"></i>
          </div>
        </div>
        <div className="EstimateListDataCountAndSortBox">
          <div className="EstimateListDataCount">
            &nbsp;총&nbsp;{dataCount}개의 검색결과
          </div>
          <div className="EstimateListSort">
            <span
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                modalControl();
              }}
            >
              {sort}▼
            </span>
          </div>
        </div>
        <div className="EstimateListMatchCompleteButton">
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
        <div className="EstimateListDataBox">
          {withcomplete === false ? (
            <DataListComp list={dataArraywithoutComplete} navigate={navigate} />
          ) : (
            <DataListComp list={dataArraywithComplete} navigate={navigate} />
          )}
        </div>
        <div style={{ height: 200 }}></div>
      </div>
      {/*컨테이너 */}
      <Footer />
      <SortModal
        setSort={setSort}
        close={close}
        setClose={setClose}
        dressfilterstyle={dressfilterstyle}
        setDressfilterstyle={setDressfilterstyle}
        makeupfilterstyle={makeupfilterstyle}
        setmakeupfilterstyle={setmakeupfilterstyle}
        studiofilterstyle={studiofilterstyle}
        setstudiofilterstyle={setstudiofilterstyle}
      />
    </div>
  );
};

export default EstimateList;

const DataListComp = ({ list, navigate }) => {
  return (
    <>
      {list.map((e, index) => {
        return (
          <div
            className="EstimateListData"
            key={index}
            onClick={() => {
              navigate(`/estimatedetail/${e.id}`);
            }}
          >
            {e.matchstatus === true ? (
              <div className="EstimateListComplete">매칭완료</div>
            ) : (
              ""
            )}
            <div className="EstimateListDataTitle">
              {e.writer.slice(0, 3) + "***"} 님의 견적서
            </div>
            <div className="EstimateListDataRegion">
              희망지역 :{" "}
              {JSON.parse(e.region).map((e, index) => {
                return <span>{e}&nbsp;&nbsp;</span>;
              })}
            </div>
            <div className="EstimateListDataBudget">
              희망 예산 : {e.budget}원
            </div>
            <div className="EstimateListDataViewCountAndDate">
              <div className="ViewCountAndDate">조회수 : {e.viewcount} </div>
              <div className="ViewCountAndDate">작성일 : {e.date}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const SortModal = ({
  setSort,
  close,
  setClose,
  dressfilterstyle,
  setDressfilterstyle,
  makeupfilterstyle,
  setmakeupfilterstyle,
  studiofilterstyle,
  setstudiofilterstyle,
}) => {
  const onClose = () => {
    setDressfilterstyle(0);
    setmakeupfilterstyle(0);
    setSort((prevdata) => prevdata);
  };

  const onChange = () => {
    if (dressfilterstyle === 0) {
      setDressfilterstyle(60);
      setmakeupfilterstyle(0);
      setstudiofilterstyle(0);
    } else setDressfilterstyle(0);
  };

  const onChange2 = () => {
    if (makeupfilterstyle === 0) {
      setmakeupfilterstyle(60);
      setDressfilterstyle(0);
      setstudiofilterstyle(0);
    } else setmakeupfilterstyle(0);
  };

  const onChange3 = () => {
    if (studiofilterstyle === 0) {
      setmakeupfilterstyle(0);
      setDressfilterstyle(0);
      setstudiofilterstyle(60);
    } else setstudiofilterstyle(0);
  };

  let onSortChange = (e) => {
    setSort(e.target.value);
    setClose("modal");
  };

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
              게시글 필터링
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body filter-body">
            <div
              className="cursor filter-box"
              onClick={() => {
                setSort("최신순");
              }}
              data-bs-dismiss="modal"
            >
              최신순
            </div>
            <div
              className="cursor filter-box"
              onClick={() => {
                setSort("높은가격순");
              }}
              data-bs-dismiss="modal"
            >
              높은가격순
            </div>
            <div
              className="cursor filter-box"
              onClick={() => {
                setSort("낮은가격순");
              }}
              data-bs-dismiss="modal"
            >
              낮은가격순
            </div>
            <div
              className="cursor filter-box"
              onClick={() => {
                setSort("높은조회수순");
              }}
              data-bs-dismiss="modal"
            >
              높은조회수순
            </div>
            <div
              className="cursor filter-box"
              onClick={() => {
                onChange();
              }}
            >
              드레스
            </div>
            <div
              className="filter-box-accodian"
              style={{ height: dressfilterstyle }}
            >
              <select
                className="form-select"
                style={{ fontSize: 20 }}
                data-bs-dismiss={close}
                onChange={onSortChange}
              >
                <option selected={close === "none"} disabled>
                  드레스를 선택해주세요
                </option>
                <option value="드레스(머메이드)">머메이드</option>
                <option value="드레스(A라인)">A라인</option>
                <option value="드레스(H라인)">H라인</option>
                <option value="드레스(프린세스)">프린세스</option>
                <option value="드레스(엠파이어)">엠파이어</option>
                <option value="드레스(벨라인)">벨라인</option>
              </select>
            </div>
            <div
              className="cursor filter-box"
              onClick={() => {
                onChange2();
              }}
            >
              메이크업
            </div>
            <div
              className="filter-box-accodian"
              style={{ height: makeupfilterstyle }}
            >
              <select
                className="form-select"
                style={{ fontSize: 20 }}
                data-bs-dismiss={close}
                onChange={onSortChange}
              >
                <option selected={close === "none"} disabled>
                  메이크업을 선택해주세요
                </option>
                <option value="메이크업(로맨틱)">로맨틱</option>
                <option value="메이크업(포인트)">포인트</option>
                <option value="메이크업(내추럴)">내추럴</option>
                <option value="메이크업(스모키)">스모키</option>
                <option value="메이크업(큐티)">큐티</option>
                <option value="메이크업(러블리)">러블리</option>
              </select>
            </div>
            <div
              className="cursor filter-box"
              onClick={() => {
                onChange3();
              }}
            >
              스튜디오
            </div>
            <div
              className="filter-box-accodian"
              style={{ height: studiofilterstyle }}
            >
              <select
                className="form-select"
                style={{ fontSize: 20 }}
                data-bs-dismiss={close}
                onChange={onSortChange}
              >
                <option selected={close === "none"} disabled>
                  스튜디오를 선택해주세요
                </option>
                <option value="스튜디오(인물중심)">인물중심</option>
                <option value="스튜디오(배경중심)">배경중심</option>
                <option value="스튜디오(균형적인)">균형적인</option>
              </select>
            </div>
            <div></div>
            <div></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => onClose()}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
