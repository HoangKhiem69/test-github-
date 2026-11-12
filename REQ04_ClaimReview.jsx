import React,{useEffect,useState} from 'react';

export default function REQ04_ClaimReview({api,notify,onOpenRoom}) {
  const [claims,setClaims]=useState([]);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(null);
  async function reload(){try{setClaims(await api('/claims/inbox'));setError('')}catch(e){setError(e.message)}}
  useEffect(()=>{reload()},[]);
  async function review(id,approve){
    setBusy(id);
    try {await api(`/claims/${id}/review`,{method:'PATCH',body:JSON.stringify({approve})});await reload();notify?.(approve?'Đã duyệt yêu cầu.':'Đã từ chối yêu cầu.');}
    catch(e){setError(e.message)}finally{setBusy(null)}
  }
  return <section className="req04-review"><h2>Danh sách xin nhận đồ</h2>
    <p className="req04-privacy">Bằng chứng riêng tư. Chỉ người giữ đồ và quản trị viên được xem.</p>
    {error&&<p className="req04-error" role="alert">{error}</p>}
    {claims.length===0&&<p>Chưa có yêu cầu.</p>}
    {claims.map(c=><article className="req04-claim" key={c.id}>
      <h3>{c.reportName||'Đồ nhặt được'} — {c.status}</h3>
      <p><strong>Bằng chứng bí mật:</strong> {c.evidence}</p>
      {c.status==='PENDING'&&<div className="req04-actions"><button disabled={busy===c.id} onClick={()=>review(c.id,true)}>Duyệt</button><button className="req04-reject" disabled={busy===c.id} onClick={()=>review(c.id,false)}>Từ chối</button></div>}
      {c.status==='APPROVED'&&<button onClick={()=>onOpenRoom?.(c.id)}>Mở phòng bàn giao</button>}
    </article>)}
  </section>;
}
