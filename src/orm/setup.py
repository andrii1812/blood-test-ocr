from orm.entities import *
from pony.orm import db_session


@db_session
def add_reference_names():
    ReferenceName(sort_order=0, name='RBC-Alyuvarlar')
    ReferenceName(sort_order=1, name='HGB-Hemoglobin')
    ReferenceName(sort_order=2, name='HCT-Hematokrit')
    ReferenceName(sort_order=3, name='MCV')
    ReferenceName(sort_order=4, name='MCH')
    ReferenceName(sort_order=5, name='MCHC')
    ReferenceName(sort_order=6, name='RDW-SD')
    ReferenceName(sort_order=7, name='RDW')
    ReferenceName(sort_order=8, name='WBC-Akyuvarlar')
    ReferenceName(sort_order=9, name='Nötrofil%')
    ReferenceName(sort_order=10, name='Lenfosit%')
    ReferenceName(sort_order=11, name='Monosit%')
    ReferenceName(sort_order=12, name='Eozinofil%')
    ReferenceName(sort_order=13, name='Bazofil%')
    ReferenceName(sort_order=14, name='Nötrofil#')
    ReferenceName(sort_order=15, name='Lenfosit#')
    ReferenceName(sort_order=16, name='Monosit#')
    ReferenceName(sort_order=17, name='Eozinofil#')
    ReferenceName(sort_order=18, name='Bazofil#')
    ReferenceName(sort_order=19, name='PLT-Trombosit')
    ReferenceName(sort_order=20, name='MPV')
    ReferenceName(sort_order=21, name='PDW')
    ReferenceName(sort_order=22, name='PCT')
    ReferenceName(sort_order=23, name='GLUKOZ, AÇLIK')
    ReferenceName(sort_order=24, name='KALSIUM (CA), TOTAL, SERUM')
    ReferenceName(sort_order=25, name='MAGNESIUM (Mg), TOTAL, SERUM')
    ReferenceName(sort_order=26, name='CRP, KANTITATIF')
    ReferenceName(sort_order=27, name='SODYUM (Na), SERUM')
    ReferenceName(sort_order=28, name='POTASYUM (K), SERUM')
    ReferenceName(sort_order=29, name='aPPT')
    ReferenceName(sort_order=30, name='PT%#')
    ReferenceName(sort_order=31, name='PROTROMBIN ZAMANI')
    ReferenceName(sort_order=32, name='PTIRN#')
    ReferenceName(sort_order=33, name='tFGH (CKD-EPI)#')
    ReferenceName(sort_order=34, name='tFGH (MDRD)#')
    ReferenceName(sort_order=35, name='KREATININ, SERUM#')
    ReferenceName(sort_order=36, name='ÜRE, SERUM')
    ReferenceName(sort_order=37, name='ÜRIK ACIT, SERUM')
    ReferenceName(sort_order=38, name='PROTEIN, TOTAL, SERUM')
    ReferenceName(sort_order=39, name='ALBUMIN, SERUM')
    ReferenceName(sort_order=40, name='MAGNESYUM (Mg), SERUM')
    ReferenceName(sort_order=41, name='SGOT (AST)')
    ReferenceName(sort_order=42, name='SGPT (ALT)')
    ReferenceName(sort_order=43, name='ALP (ALKALEN FOSFATAZ)')
    ReferenceName(sort_order=44, name='GGT (G-GLUTAMIL TRANSFERAZ)')
    ReferenceName(sort_order=45, name='LDH (LAKTAK DEHID.), SERUM')
    ReferenceName(sort_order=46, name='BILIRUBIN, DIREKT, SERUM')
    ReferenceName(sort_order=47, name='BILIRUBIN, TOTAL')


@db_session
def add_tags():
    Tag(sort_order=0, name='Chemo1')
    Tag(sort_order=1, name='Chemo2')
    Tag(sort_order=2, name='SCT')
    Tag(sort_order=3, name=config.NONE_TAG_NAME)


@db_session
def seed_db():
    add_reference_names()
    add_tags()


if __name__ == '__main__':
    seed_db()

