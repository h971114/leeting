package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leeting.myapp.model.ReportDto;

@Repository
public class ReportDaoImpl implements ReportDao{
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void writeReport(ReportDto report)  throws SQLException{
		sqlSession.insert("report.writeReport",report);
	}

	@Override
	public List<ReportDto> listReport() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("report.listReport");
	}

	@Override
	public ReportDto getReportInfo(int reportno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("report.reportinfo",reportno);
	}

	@Override
	public void updateReport(ReportDto report) {
		sqlSession.update("report.reportmodify",report);
		
	}

	@Override
	public void deleteReport(int reportno) {
		sqlSession.delete("report.reportdelete",reportno);
		
	}
}
