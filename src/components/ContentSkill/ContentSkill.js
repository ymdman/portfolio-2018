import React from 'react';
import SkillGraph from '../SkillGraph/SkillGraph';
import Tool from '../Tool/Tool';

const ContentSkill = () => (
  <div>
    <section className="l-section">
      <h2 className="l-section__title">Skill</h2>
      <div className="l-section__detail">
        <p>自己評価ですがスキルについて説明させて頂きます。</p>
        <SkillGraph />
        <Tool />
      </div>
    </section>
  </div>
);

export default ContentSkill;
